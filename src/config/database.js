const sqlite3 = require('sqlite3').verbose();
const logger = require('./logger');

const dbPath = process.env.DATABASE_PATH;
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        logger.error(`Error al conectar con SQLite: ${err.message}`);
    } else {
        logger.info('Conectado a la base de datos SQLite');
    }
});

module.exports = db;