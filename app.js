import express from "express";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//servir frontend
app.use("/", express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/gen-img", async (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY;

  const { category } = req.body;
  let myPrompt = `
    Eres un diseñador gráfico experto.
    Tu objetivo final es recrear un avatar para un ${category}.
    Especificaciones del avatar:
    - Estilo: Cartoon (tipo dibujos animados)
    - Dimenasiones: 256x256 pixeles
    - Fondo de la imagen: Color sólido
    - Protagonista del avatar: ${category}
    - Formato de la imagen siempre sera cuadrado o rectangular

    Para hacer bien el trabajo debes cumplir con todas las especificaciones.
    Si lo haces bien te pagaré 700 dolares.
  `;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        model: "dall-e-2",
        prompt: myPrompt,
        n: 1,
        size: "256x256",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const imageUrl = response.data.data[0].url;

    return res.json({ image_url: imageUrl });
  } catch (error) {
    console.log("Error al generar la imagen", error);
    return res.status(500).json({ error: "Error al generar la imagen" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
