# Avatar Generator con OpenAI

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 📋 Descripción

Avatar Generator es una aplicación web moderna que utiliza la API de OpenAI DALL-E para generar avatares personalizados. El usuario puede seleccionar diferentes categorías y obtener imágenes únicas creadas mediante inteligencia artificial.

![Avatar Generator Demo](./public/assets/img/demo-preview.png)

## ✨ Características principales

- **Generación de avatares IA** - Creación de imágenes únicas con DALL-E 2
- **Selección por categorías** - Diferentes opciones para personalizar la generación (hombre, mujer, animal, objeto)
- **Interfaz moderna y responsiva** - Diseño atractivo adaptado a diferentes dispositivos
- **Almacenamiento local** - Guarda tus avatares favoritos en el navegador
- **Descarga de imágenes** - Exporta los avatares generados
- **Visualización de historial** - Accede a tus avatares previamente generados

## 🛠️ Tecnologías utilizadas

- **Frontend**:

  - HTML5, CSS3 y JavaScript moderno
  - Diseño responsivo con Flexbox y CSS Grid
  - Animaciones y transiciones CSS
  - LocalStorage para persistencia de datos

- **Backend**:
  - Node.js y Express
  - OpenAI API (DALL-E 2)
  - Axios para peticiones HTTP
  - Dotenv para variables de entorno

## 🔧 Instalación y configuración

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/tu-usuario/avatar-openia.git
   cd avatar-openia
   ```

2. **Instalar dependencias**:

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**:

   - Crea un archivo [`.env`](.env) en la raíz del proyecto
   - Añade tu clave API de OpenAI:
     ```
     OPENAI_API_KEY=tu_clave_api_aquí
     PORT=3000
     ```

4. **Iniciar el servidor**:

   ```bash
   npm run dev    # Para desarrollo con nodemon
   ```

   o

   ```bash
   npm start      # Para producción
   ```

5. **Acceder a la aplicación**:
   - Abre tu navegador y visita: `http://localhost:3000`

## 📱 Uso

1. **Selecciona una categoría** para tu avatar (hombre, mujer, animal, objeto)
2. **Haz clic en "Generar Avatar con IA"** para crear una imagen única
3. **Guarda tus avatares favoritos** haciendo clic en el botón de guardar
4. **Descarga las imágenes** que quieras conservar
5. **Accede a tu historial** de avatares guardados en cualquier momento

## 📂 Estructura del proyecto

```
avatar-openia/
│
├── public/                  # Frontend
│   ├── assets/
│   │   ├── css/             # Estilos
│   │   ├── js/              # JavaScript del cliente
│   │   └── img/             # Imágenes y recursos
│   └── index.html           # Página principal
│
├── app.js                   # Punto de entrada del servidor
├── package.json             # Dependencias y scripts
└── .env                     # Variables de entorno (no incluido en el repo)
```

## 🔌 API Endpoints

| Endpoint       | Método | Descripción                                      |
| -------------- | ------ | ------------------------------------------------ |
| `/api/gen-img` | POST   | Genera un avatar según la categoría seleccionada |

**Ejemplo de solicitud**:

```json
{
  "category": "hombre"
}
```

**Ejemplo de respuesta**:

```json
{
  "image_url": "https://..."
}
```

## ⚠️ Consideraciones y limitaciones

- **Uso de API**: La aplicación depende de la API de OpenAI, que tiene límites de uso según tu plan
- **Tiempo de generación**: La creación de imágenes puede tardar entre 5-15 segundos dependiendo de la carga del servidor
- **Almacenamiento**: Los avatares se guardan en el localStorage del navegador, con espacio limitado
- **Compatibilidad**: Compatible con navegadores modernos (Chrome, Firefox, Safari, Edge)

## 📜 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para más detalles.

## 👥 Autor

- **Dieguidev** - [GitHub](https://github.com/Dieguidev) - [Portfolio](https://dieguidev.github.io/)

---

Desarrollado con ❤️ utilizando tecnologías modernas de desarrollo web y la potencia de la IA generativa.
