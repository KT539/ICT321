const db = require('../config/database.js'); // ton module de connexion MySQL

/**
 * Retrieves a single pizza by its ID.
 * Uses a parameterized query to securely prevent SQL Injection.
 */
exports.getOnePizza = async (id) => {

    const sql = `
        SELECT * FROM pizzas WHERE id = ?`;
    const [rows] = await db.query(sql, [id]);
    return rows[0];
};
