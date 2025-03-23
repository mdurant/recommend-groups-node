const db = require('../config/database');
const logger = require('../config/logger');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL
        )
    `);
    db.run(`
        CREATE TABLE IF NOT EXISTS groups (
            group_id INTEGER PRIMARY KEY AUTOINCREMENT,
            group_name TEXT NOT NULL
        )
    `);
    db.run(`
        CREATE TABLE IF NOT EXISTS user_groups (
            user_id INTEGER,
            group_id INTEGER,
            PRIMARY KEY (user_id, group_id),
            FOREIGN KEY (user_id) REFERENCES users(user_id),
            FOREIGN KEY (group_id) REFERENCES groups(group_id)
        )
    `);

    // Insertar datos de ejemplo
    db.run(`INSERT OR IGNORE INTO users (user_id, username) VALUES (1, 'Ana')`);
    db.run(`INSERT OR IGNORE INTO users (user_id, username) VALUES (2, 'Bob')`);
    db.run(`INSERT OR IGNORE INTO users (user_id, username) VALUES (3, 'Clara')`);

    db.run(`INSERT OR IGNORE INTO groups (group_id, group_name) VALUES (1, 'Fotografía')`);
    db.run(`INSERT OR IGNORE INTO groups (group_id, group_name) VALUES (2, 'Viajes')`);
    db.run(`INSERT OR IGNORE INTO groups (group_id, group_name) VALUES (3, 'Cocina')`);

    db.run(`INSERT OR IGNORE INTO user_groups (user_id, group_id) VALUES (1, 1)`);
    db.run(`INSERT OR IGNORE INTO user_groups (user_id, group_id) VALUES (2, 1)`);
    db.run(`INSERT OR IGNORE INTO user_groups (user_id, group_id) VALUES (2, 2)`);
    db.run(`INSERT OR IGNORE INTO user_groups (user_id, group_id) VALUES (3, 1)`);
    db.run(`INSERT OR IGNORE INTO user_groups (user_id, group_id) VALUES (3, 2)`);
    db.run(`INSERT OR IGNORE INTO user_groups (user_id, group_id) VALUES (3, 3)`);

    logger.info('Base de datos poblada con datos de ejemplo');
});

db.close();