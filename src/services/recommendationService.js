const db = require('../config/database');
const logger = require('../config/logger');
process.loadEnvFile();

async function recommendGroups(userId) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT group_id FROM user_groups WHERE user_id = ?`, [userId], (err, rows) => {
            if (err) {
                logger.error(`Error al obtener grupos del usuario ${userId}: ${err.message}`);
                return reject(err);
            }

            const userGroups = rows.map(row => row.group_id);

            if (userGroups.length === 0) {
                logger.warn(`El usuario ${userId} no pertenece a ningún grupo`);
                return resolve([]);
            }

            db.all(
                `
                SELECT DISTINCT ug2.user_id
                FROM user_groups ug1
                JOIN user_groups ug2 ON ug1.group_id = ug2.group_id
                WHERE ug1.user_id = ? AND ug2.user_id != ?
                `,
                [userId, userId],
                (err, rows) => {
                    if (err) {
                        logger.error(`Error al encontrar usuarios similares para ${userId}: ${err.message}`);
                        return reject(err);
                    }

                    const similarUsers = rows.map(row => row.user_id);

                    if (similarUsers.length === 0) {
                        logger.warn(`No se encontraron usuarios similares para el usuario ${userId}`);
                        return resolve([]);
                    }

                    const placeholders = similarUsers.map(() => '?').join(',');
                    const query = `
                        SELECT ug.group_id, g.group_name, COUNT(ug.user_id) as user_count
                        FROM user_groups ug
                        JOIN groups g ON ug.group_id = g.group_id
                        WHERE ug.user_id IN (${placeholders})
                        AND ug.group_id NOT IN (${userGroups.map(() => '?').join(',')})
                        GROUP BY ug.group_id, g.group_name
                        ORDER BY user_count DESC
                        LIMIT 5
                    `;
                    const params = [...similarUsers, ...userGroups];

                    db.all(query, params, (err, rows) => {
                        if (err) {
                            logger.error(`Error al obtener recomendaciones para ${userId}: ${err.message}`);
                            return reject(err);
                        }

                        const recommendations = rows.map(row => ({
                            group_id: row.group_id,
                            group_name: row.group_name,
                            popularity: row.user_count,
                        }));

                        logger.info(`Recomendaciones generadas para el usuario ${userId}: ${JSON.stringify(recommendations)}`);
                        resolve(recommendations);
                    });
                }
            );
        });
    });
}

module.exports = { recommendGroups };