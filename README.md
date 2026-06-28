# 🪙 Cotizador de Criptomonedas — Vue 3

Una aplicación web interactiva y responsiva desarrollada con **Vue 3 (Composition API)** a través de CDN, que permite visualizar, filtrar, convertir y simular el mercado de criptomonedas en tiempo real.

---

## 🚀 Características Principales

* **Monitoreo en Vivo:** Simulación de fluctuación de precios y variaciones porcentuales del mercado al instante.
* **Filtros Avanzados y Búsqueda:** Buscador por nombre/símbolo y pestañas para clasificar monedas (*Todas*, *Ganadoras*, *Perdedoras* y *Favoritas*).
* **Detalle del Mercado:** Tarjeta informativa con estadísticas completas (Capitalización, volumen, máximos y mínimos).
* **Gráfica Interactiva:** Renderizado dinámico de la variación de las últimas 24 horas utilizando **Chart.js**.
* **Convertidor Multidivisa:** Conversión bidireccional entre la cripto seleccionada y monedas fiat (USD, EUR, GBP, CLP, MXN).
* **Sistema de Alertas:** Creación y eliminación de alertas personalizadas para avisar cuando el precio sube o baja de un límite establecido.

---

## 📂 Estructura del Proyecto

Para que la aplicación funcione correctamente, los archivos deben organizarse de la siguiente manera:

```text
📁 cotizador-criptos/
│
├── 📄 index.html          # Estructura de la app y plantillas de Vue
├── 📁 css/
│   └── 📄 styles.css      # Estilos y diseño visual del sitio
└── 📁 js/
    ├── 📄 data.js         # Datos iniciales (mock) y funciones utilitarias
    └── 📄 app.js          # Lógica principal y estado de Vue 3


    🛠️ Tecnologías Utilizadas
HTML5 & CSS3 (Layout basado en Grid y Flexbox)

Vue 3 (CDN - Composition API con ref, computed, watch, onMounted)

Chart.js (Librería para el gráfico de líneas dinámico)

Tabler Icons (Tipografía de íconos vectoriales)

💻 Cómo Ejecutar el Proyecto
Al ser un proyecto del lado del cliente (frontend) sin servidores complejos, puedes ejecutarlo de dos formas sencillas:

Opción 1: Abrir directamente (Rápido)
Descarga o clona la carpeta del proyecto.

Ve a la raíz del directorio y haz doble clic sobre el archivo index.html para abrirlo en tu navegador web preferido.

Opción 2: Usar un servidor local (Recomendado)
Para asegurar que todos los scripts y gráficos carguen de forma óptima sin restricciones de políticas del navegador, usa una extensión de servidor local:

Abre la carpeta del proyecto en Visual Studio Code.

Instala la extensión Live Server (si no la tienes ya).

Haz clic derecho sobre index.html y selecciona "Open with Live Server" (o presiona el botón Go Live en la esquina inferior derecha de VS Code).

La aplicación se abrirá automáticamente en tu navegador en la dirección http://127.0.0.1:5500.

⚙️ Explicación del Código Core (js/app.js)
La lógica reactiva maneja el estado global de la aplicación:

cryptos: Estado reactivo que contiene el array de monedas.

filteredCryptos: Propiedad computada (computed) que reacciona inmediatamente al escribir en el buscador o cambiar de filtro.

refreshPrices(): Modifica sutilmente los valores numéricos mediante Math.random() para simular la volatilidad real del mercado financiero.

