const winston = require('winston');
process.loadEnvFile();

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: process.env.LOG_PATH }),
        new winston.transports.Console()
    ],
});

module.exports = logger;