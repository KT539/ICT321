const db = require('../config/database.js'); // ton module de connexion MySQL

// with ChatGPT's help
exports.getAllIngredients = () => {
    const sql = `
        SELECT * from Ingredients
        ORDER BY id ASC;`;

    return new Promise((resolve, reject) => {
        db.query(sql, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};