# Social Network Recommendation POC

Este proyecto es una **Prueba de Concepto (POC)** de un sistema de recomendación basado en un algoritmo de análisis de redes de bipartición. Recomienda grupos a usuarios en una red social basándose en intereses compartidos. Utiliza **Node.js**, **Express**, y **SQLite** como base de datos, con **DB Browser for SQLite** como IDE para gestionar la base de datos.

## Tecnologías
- **Node.js 23.x**: Backend y lógica del servidor (soporte nativo para `--env-file`).
- **Express**: Framework para la API.
- **SQLite**: Base de datos ligera.
- **DB Browser for SQLite**: IDE para gestionar la base de datos.
- **Winston**: Logging.
- **Jest**: Pruebas unitarias e integrales.

## Estructura del proyecto
- `src/`: Código fuente.
  - `config/`: Configuraciones (base de datos, logger).
    - `database.js`: Configuración e inicialización de SQLite.
    - `logger.js`: Configuración de Winston.
  - `controllers/`: Lógica de las solicitudes HTTP.
    - `recommendationController.js`: Controlador para manejar las recomendaciones.
  - `middleware/`: Middlewares personalizados.
    - `errorHandler.js`: Middleware para manejo de errores.
  - `routes/`: Definición de rutas de la API.
    - `recommendationRoutes.js`: Rutas para las recomendaciones.
  - `services/`: Lógica de negocio.
    - `recommendationService.js`: Algoritmo de recomendación basado en redes de bipartición.
  - `utils/`: Utilidades.
    - `validate.js`: Funciones de validación.
  - `app.js`: Punto de entrada de la aplicación.
- `database/`: Archivos relacionados con la base de datos.
  - `database.sqlite`: Archivo de la base de datos SQLite (se genera al inicializar).
  - `init_database.sql`: Script SQL para inicializar la base de datos con tablas y datos de ejemplo.
- `logs/`: Logs generados por Winston.
  - `app.log`: Archivo de logs.
- `tests/`: Pruebas unitarias e integrales.
  - `unit/`: Pruebas unitarias.
    - `recommendationService.test.js`: Pruebas para el servicio de recomendación.
  - `integration/`: Pruebas de integración.
    - `recommendationRoutes.test.js`: Pruebas para las rutas de la API.
- `docs/`: Documentación adicional.
  - `api.md`: Documentación de la API.
- `.env`: Variables de entorno.
- `.env.example`: Ejemplo de variables de entorno.
- `.gitignore`: Archivos y carpetas a ignorar en Git.
- `package.json`: Dependencias y scripts del proyecto.
- `jest.config.js`: Configuración de Jest para pruebas.
- `Dockerfile`: Archivo para contenerizar la aplicación.

## Requisitos previos
- **Node.js 23.x** o superior (para soporte nativo de `--env-file`).
- **DB Browser for SQLite** (descargar desde [https://sqlitebrowser.org/](https://sqlitebrowser.org/)).
- Un cliente HTTP como `curl`, Postman, o un navegador web para probar los endpoints.

## Instalación
Sigue estos pasos para configurar y ejecutar el proyecto:

1. **Clona el repositorio**:
   ```bash
   git clone <url-del-repositorio>
   cd social-network-recommendation
