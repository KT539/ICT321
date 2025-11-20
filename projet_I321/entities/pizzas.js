const db = require('../config/database.js'); // ton module de connexion MySQL

// with ChatGPT's help
exports.getAllPizzas = () => {
    const sql = `
        SELECT 
            p.id,
            p.name,
            p.imageURL,
            p.price,
            p.created_at,
            p.updated_at,
            GROUP_CONCAT(i.name ORDER BY i.name SEPARATOR ', ') AS ingredients
        FROM pizzas p
        LEFT JOIN pizza_ingredients pi ON p.id = pi.pizza_id
        LEFT JOIN ingredients i ON pi.ingredient_id = i.id
        GROUP BY p.id
        ORDER BY p.id DESC;
    `;

    return new Promise((resolve, reject) => {
        db.query(sql, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};