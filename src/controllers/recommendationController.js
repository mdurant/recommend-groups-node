const { recommendGroups } = require('../services/recommendationService');
const logger = require('../config/logger');
const { validateUserId } = require('../utils/validate');
process.loadEnvFile();

async function getRecommendations(req, res) {
    const userId = parseInt(req.params.userId);

    // Validar el userId
    const validationError = validateUserId(userId);
    if (validationError) {
        logger.warn(`Solicitud inválida: ${validationError}`);
        return res.status(400).json({ error: validationError });
    }

    try {
        logger.info(`Procesando recomendación para el usuario ${userId}`);
        const recommendations = await recommendGroups(userId);
        res.json(recommendations);
    } catch (error) {
        logger.error(`Error al procesar recomendación para usuario ${userId}: ${error.message}`);
        throw error; // El middleware de manejo de errores lo capturará
    }
}

module.exports = { getRecommendations };