import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//servir frontend
app.use("/", express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/gen-img", async (req, res) => {
  const apiKey = process.env.API_KEY;
  const { category } = req.body;
  let promp = `
    Eres un diseñador gráfico experto.
    Tu objetivo final es recrear un avatar para un usuario.
    Especificaciones del avatar:
    - Estilo: Cartoon (tipo dibujos animados)
    - Dimenasiones: 256x256 pixeles
    - Fondo de la imagen: Color sólido
    - Protagonista del avatar: ${category}

    Para hacer bien el trabajo debes cumplir con todas las especificaciones.
    Si lo haces bien te pagaré 700 dolares.
    Recuerda que en el avatar debe aparecer un ${category} y el fondo debe ser de color sólido.
  `;
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
