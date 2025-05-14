const generateBtn = document.querySelector(".btn-generate");
const avatarBox = document.querySelector(".avatar-box");
const loading = document.querySelector(".loading");
const categoryselector = document.querySelector(".category-selector");

loading.style.display = "none";

generateBtn.addEventListener("click", async () => {
  //sacar la categoria seleccionada
  const category = categoryselector.value;

  //mostrar cargando
  loading.style.display = "block";

  //peticion ajax al backend
  try {
    let response = await fetch("http://localhost:3000/api/gen-img", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category }),
    });
    let data = await response.json();
    //Incrustar la imagen en la caja
    if (data && data.image_url) {
      avatarBox.innerHTML = `<img src="${data.image_url}" alt="Avatar" class="avatar-transition">`;
      avatarBox.classList.add("pulse");
      setTimeout(() => avatarBox.classList.remove("pulse"), 1500);
    } else {
      alert("No se ha podido generar la imagen");
    }
  } catch (error) {
    console.log(error);
    alert("Error al generar la imagen");
  } finally {
    //ocultar cargando
    loading.style.display = "none";
  }
});
