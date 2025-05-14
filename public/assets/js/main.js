const generateBtn = document.querySelector(".btn-generate");
const avatarBox = document.querySelector(".avatar-box");
const loading = document.querySelector(".loading");
const categoryselector = document.querySelector(".category-selector");

// Seleccionar categorías
const categoryCards = document.querySelectorAll(".category-card");
let selectedCategory = "hombre"; // Valor por defecto

categoryCards.forEach((card) => {
  card.addEventListener("click", () => {
    // Quitar clase active de todas las tarjetas
    categoryCards.forEach((c) => c.classList.remove("active"));
    // Añadir clase active a la tarjeta seleccionada
    card.classList.add("active");
    // Actualizar categoría seleccionada
    selectedCategory = card.dataset.value;
  });
});

// Marcar la primera tarjeta como activa por defecto
categoryCards[0].classList.add("active");

loading.style.display = "none";

generateBtn.addEventListener("click", async () => {
  //sacar la categoria seleccionada
  // const category = categoryselector.value;

  //mostrar cargando
  loading.style.display = "block";

  //peticion ajax al backend
  try {
    let response = await fetch("http://localhost:3000/api/gen-img", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category: selectedCategory }),
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
