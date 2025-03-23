const express = require('express');
const recommendationRoutes = require('./routes/recommendationRoutes');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./config/logger');
const db = require('./config/database');
process.loadEnvFile();

const app = express();
const PORT = process.env.PORT || 3000;

// Rutas
app.use('/api', recommendationRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

// Iniciar el servidor
app.listen(PORT, () => {
    logger.info(`Servidor iniciado en el puerto ${PORT}`);
});

// Manejo de cierre de la base de datos
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            logger.error(`Error al cerrar la base de datos: ${err.message}`);
        }
        logger.info('Base de datos cerrada');
        process.exit(0);
    });
});