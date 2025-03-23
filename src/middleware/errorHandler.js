const logger = require('../config/logger');

function errorHandler(err, req, res, next) {
    logger.error(`Error no manejado: ${err.message}`);
    res.status(500).json({ error: 'Error interno del servidor' });
}

module.exports = errorHandler;