const generateBtn = document.querySelector(".btn-generate");
const avatarBox = document.querySelector(".avatar-box");
const loadingContainer = document.querySelector(".loading-container");
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
  // Deshabilitar botón durante la generación
  generateBtn.disabled = true;
  //sacar la categoria seleccionada
  // const category = categoryselector.value;

  //mostrar cargando
  loadingContainer.style.display = "flex";

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
      // Actualizar avatar con la nueva imagen
      const imgElement =
        avatarBox.querySelector("img") || document.createElement("img");
      imgElement.src = data.image_url;
      imgElement.alt = "Avatar";
      imgElement.className = "avatar-transition";

      // Si no existe la imagen, agregarla
      if (!avatarBox.querySelector("img")) {
        avatarBox.appendChild(imgElement);
      }

      // Efecto visual
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
    loadingContainer.style.display = "none";
    // Habilitar botón nuevamente
    generateBtn.disabled = false;
  }
});

// Funcionalidad para guardar avatares
const saveAvatarBtn = document.getElementById("saveAvatar");
const downloadAvatarBtn = document.getElementById("downloadAvatar");
const savedAvatarsGrid = document.getElementById("savedAvatarsGrid");

// Cargar avatares guardados si existen
let savedAvatars = JSON.parse(localStorage.getItem("savedAvatars") || "[]");
renderSavedAvatars();

// Guardar avatar
saveAvatarBtn.addEventListener("click", () => {
  const avatarImg = avatarBox.querySelector("img");
  if (avatarImg) {
    const newAvatar = {
      id: Date.now(),
      url: avatarImg.src,
      category: selectedCategory,
    };

    savedAvatars.push(newAvatar);
    localStorage.setItem("savedAvatars", JSON.stringify(savedAvatars));
    renderSavedAvatars();

    // Feedback visual
    saveAvatarBtn.textContent = "✅";
    setTimeout(() => (saveAvatarBtn.textContent = "💾"), 1500);
  }
});

// Descargar avatar
downloadAvatarBtn.addEventListener("click", () => {
  const avatarImg = avatarBox.querySelector("img");
  if (avatarImg) {
    const link = document.createElement("a");
    link.href = avatarImg.src;
    link.download = `avatar-${selectedCategory}-${Date.now()}.png`;
    link.click();
  }
});

// Renderizar avatares guardados
function renderSavedAvatars() {
  savedAvatarsGrid.innerHTML = "";

  if (savedAvatars.length === 0) {
    // Mostrar mensaje si no hay avatares guardados
    savedAvatarsGrid.innerHTML =
      '<p class="no-avatars">No hay avatares guardados</p>';
    return;
  }

  savedAvatars.forEach((avatar) => {
    const avatarEl = document.createElement("div");
    avatarEl.className = "saved-avatar";
    avatarEl.innerHTML = `
      <img src="${avatar.url}" alt="Avatar guardado">
      <div class="delete-avatar" title="Eliminar avatar">×</div>
    `;

    // Cargar avatar al hacer clic en la imagen
    const imgElement = avatarEl.querySelector("img");
    imgElement.addEventListener("click", () => {
      avatarBox.innerHTML = `<img src="${avatar.url}" alt="Avatar" class="avatar-transition">`;
    });

    // Eliminar avatar
    const deleteBtn = avatarEl.querySelector(".delete-avatar");
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Evitar que se active el click de la imagen

      // Añadir animación antes de eliminar
      avatarEl.classList.add("avatar-delete-animation");

      // Eliminar después de la animación
      setTimeout(() => {
        // Filtrar el array para quitar este avatar
        savedAvatars = savedAvatars.filter((item) => item.id !== avatar.id);

        // Guardar en localStorage
        localStorage.setItem("savedAvatars", JSON.stringify(savedAvatars));

        // Volver a renderizar (o simplemente quitar este elemento)
        renderSavedAvatars();
      }, 300); // Tiempo de la animación
    });

    savedAvatarsGrid.appendChild(avatarEl);
  });
}
