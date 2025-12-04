// queries.js
const db = require('./database');

/**
 * Récupérer toutes les pizzas
 */
function getAllPizzas() {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM pizzas`, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

/**
 * Récupérer une pizza par ID
 */
function getPizzaById(id) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM pizzas WHERE id = ?`, [id], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
}

/**
 * Récupérer les ingrédients d’une pizza
 */
function getIngredientsByPizzaId(id) {
    return new Promise((resolve, reject) => {
        db.all(
            `
            SELECT i.*
            FROM ingredients i
            JOIN pizza_ingredients pi ON pi.ingredient_id = i.id
            WHERE pi.pizza_id = ?
            `,
            [id],
            (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            }
        );
    });
}

function getAllPizzasWithIngredients() {
    return new Promise((resolve, reject) => {
        const sql = `
      SELECT
        p.id AS pizza_id,
        p.name AS pizza_name,
        p.description,
        p.imageUrl,
        p.price,
        i.id AS ingredient_id,
        i.name AS ingredient_name
      FROM pizzas p
      LEFT JOIN pizza_ingredients pi ON pi.pizza_id = p.id
      LEFT JOIN ingredients i ON i.id = pi.ingredient_id
      ORDER BY p.id, i.id
    `;

        db.all(sql, (err, rows) => {
            if (err) return reject(err);

            // pour grouper les ingrédients par pizza
            const map = new Map();
            rows.forEach((r) => {
                if (!map.has(r.pizza_id)) {
                    map.set(r.pizza_id, {
                        id: r.pizza_id,
                        name: r.pizza_name,
                        description: r.description,
                        imageUrl: r.imageUrl,
                        price: r.price,
                        ingredients: []
                    });
                }
                if (r.ingredient_id) {
                    map.get(r.pizza_id).ingredients.push({
                        id: r.ingredient_id,
                        name: r.ingredient_name
                    });
                }
            });

            resolve(Array.from(map.values()));
        });
    });
}

/**
 * Récupérer toutes les promotions en cours
 */
function getActivePromotions() {
    return new Promise((resolve, reject) => {
        db.all(
            `
            SELECT p.*, pizzas.name AS pizza_name
            FROM promotion p
            JOIN pizzas ON pizzas.id = p.pizza_id
            WHERE date('now') BETWEEN p.starting_date AND p.end_date
            `,
            (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            }
        );
    });
}

/**
 * Récupérer les promotions avec la pizza associée
 */
function getAllPromotions() {
    return new Promise((resolve, reject) => {
        db.all(
            `
            SELECT p.*, pizzas.name AS pizza_name
            FROM promotion p
            JOIN pizzas ON pizzas.id = p.pizza_id
            `,
            (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            }
        );
    });
}

function getAllIngredients() {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM ingredients`, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

// Ajouter un ingrédient
function addIngredient(name) {
    return new Promise((resolve, reject) => {
        db.run(
            "INSERT INTO ingredients (name) VALUES (?);",
            [name],
            function(err) {
                if (err) reject(err);
                else resolve(this.lastID);
            }
        );
    });
}

// Ajouter une pizza
function addPizza({ name, description, imageUrl, price }) {
    return new Promise((resolve, reject) => {
        db.run(
            "INSERT INTO pizzas (name, description, imageUrl, price) VALUES (?, ?, ?, ?);",
            [name, description || null, imageUrl || null, price],
            function(err) {
                if (err) reject(err);
                else resolve(this.lastID);
            }
        );
    });
}

// Ajouter des ingrédients à une pizza
function addIngredientsToPizza(pizzaId, ingredientIds) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare(
            "INSERT INTO pizza_ingredients (pizza_id, ingredient_id) VALUES (?, ?);"
        );
        ingredientIds.forEach((id) => stmt.run(pizzaId, id));
        stmt.finalize((err) => {
            if (err) reject(err);
            else resolve();
        });
    });
}

module.exports = {
    getAllPizzas,
    getPizzaById,
    getIngredientsByPizzaId,
    getAllPromotions,
    getActivePromotions,
    getAllPizzasWithIngredients,
    getAllIngredients,
    addIngredient,
    addPizza,
    addIngredientsToPizza
};
