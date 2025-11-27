const db = require('../config/database.js'); // ton module de connexion MySQL

// with ChatGPT's help
exports.getAllIngredients = async () => {
    const sql = `
        SELECT * from Ingredients
        ORDER BY id ASC;`;

    const [rows] = await db.query(sql);
    return rows;
};