const db = require('../config/database.js');

// used ChatGPT for GROUP_CONCAT syntax
exports.getAllPizzas = async () => {
    const sql = `
        SELECT pizzas.id,
               pizzas.name,
               pizzas.imageURL,
               pizzas.price,
               GROUP_CONCAT(ingredients.name SEPARATOR ', ') AS ingredients
        FROM pizzas
        LEFT JOIN pizza_ingredients ON pizzas.id = pizza_ingredients.pizza_id
        LEFT JOIN ingredients ON pizza_ingredients.ingredient_id = ingredients.id
        GROUP BY pizzas.id
        ORDER BY pizzas.id ASC;
    `;
    const [rows] = await db.query(sql);
    return rows;
};