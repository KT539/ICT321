// Project:     Projet_I321, module ICT 321 "Programmer des systèmes distribués"
// Teacher:     Mr J. Ithurbide
// Authors:     Kilian Testard & Niels Delafontaine
// Description: API for a Pizza Foodtruck
// Date:        2025-12-18


const db = require('../config/database.js');

class Pizzas {

    // Post (associations to ingredients Ids made with AI help)
    static createPizza({ name, description, imageUrl, price, ingredientIds = [] }) {
        return new Promise((resolve, reject) => {
            // db.serialize for order of operations
            db.serialize(() => {
                const sqlPizza = `INSERT INTO pizzas (name, description, imageUrl, price, created_at, updated_at)
                             VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))`;

                db.run(sqlPizza, [name, description || null, imageUrl || null, price], function (err) {
                    if (err) return reject(err);

                    const pizzaId = this.lastID;

                    // if no ingredients, create the pizza without it
                    if (!ingredientIds || ingredientIds.length === 0) {
                        return Pizzas.getPizzaById(pizzaId).then(resolve).catch(reject);
                    }

                    // insert the ingredients (from AI)
                    const sqlLink = `INSERT INTO pizza_ingredients (pizza_id, ingredient_id) VALUES (?, ?)`;
                    const stmt = db.prepare(sqlLink);

                    ingredientIds.forEach(ingId => {
                        stmt.run(pizzaId, ingId);
                    });

                    stmt.finalize((err) => {
                        if (err) return reject(err);
                        Pizzas.getIngredientsByPizzaId(pizzaId)
                            .then(ingredients => {
                                return Pizzas.getPizzaById(pizzaId).then(pizza => {
                                    resolve({ ...pizza, ingredients });
                                });
                            })
                            .catch(reject);
                    });
                });
            });
        });
    }

    // Get ALL
    static getAllPizzas() {
        const sql = `SELECT * FROM pizzas ORDER by id DESC`;
        return new Promise((resolve, reject) => {
            db.all(sql, [], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    // Get by ID
    static getPizzaById(id) {
        const sql = `SELECT * FROM pizzas WHERE id = ?`;
        return new Promise((resolve, reject) => {
            db.get(sql, [id], (err, row) => {
                if (err) return reject(err);
                resolve(row || null);
            });
        });
    }

    // Get ingredients for one pizza
    static getIngredientsByPizzaId(pizzaId) {
        const sql = `
            SELECT ingredients.id, ingredients.name
            FROM ingredients
            INNER JOIN pizza_ingredients ON pizza_ingredients.ingredient_id = ingredients.id
            WHERE pizza_ingredients.pizza_id = ?`;
        return new Promise((resolve, reject) => {
            db.all(sql, [pizzaId], (err, rows) => {
                if (err) return reject(err);
                resolve(rows || []);
            });
        });
    }

    // Get all pizzas with ingredients, from AI
    static async getAllPizzasWithIngredients() {
        try {
            const pizzas = await this.getAllPizzas();
            const result = await Promise.all(
                pizzas.map(async (pizza) => {
                    const ingredients = await this.getIngredientsByPizzaId(pizza.id);
                    return {
                        ...pizza,
                        ingredients
                    };
                })
            );
            return result;
        } catch (err) {
            throw err;
        }
    }

    // Get pizzas in active promotion with date(now)
    static async getPizzaWithPromotions() {
        const sql = `select pizzas.*, promotion.percentage, promotion.starting_date, promotion.end_date, promotion.id as promotion_id
        from pizzas
        INNER JOIN promotion on pizzas.id = promotion.pizza_id
        WHERE date('now') BETWEEN date(promotion.starting_date) AND date(promotion.end_date)
        ORDER BY promotion.end_date ASC`;

        return new Promise((resolve, reject) => {
            db.all(sql, [], async (err, rows) => {
                if (err) return reject(err);

                try {
                    const result = await Promise.all(
                        rows.map(async (row) => {
                            const ingredients = await this.getIngredientsByPizzaId(row.id);
                            return {
                                ...row,
                                ingredients
                            };
                        })
                    );
                    resolve(result);
                } catch (ingErr) {
                    reject(ingErr);
                }
            });
        });
    }

    // Put (associations with ingredients Ids made with AI help)
    static updatePizza(id, { name, description, imageUrl, price, ingredientIds }) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                // update the pizza's basic info
                const sqlUpdate = `
                UPDATE pizzas
                SET name = COALESCE(?, name),
                    description = COALESCE(?, description),
                    imageUrl = COALESCE(?, imageUrl),
                    price = COALESCE(?, price),
                    updated_at = datetime('now')
                WHERE id = ?`;

                db.run(sqlUpdate, [name, description, imageUrl, price, id], function (err) {
                    if (err) return reject(err);
                    if (this.changes === 0) return resolve(null);

                    // if new ingredients are provided, synchronise
                    if (ingredientIds !== undefined) {
                        // delete old links
                        db.run(`DELETE FROM pizza_ingredients WHERE pizza_id = ?`, [id], (err) => {
                            if (err) return reject(err);

                            if (ingredientIds.length > 0) {
                                const stmt = db.prepare(`INSERT INTO pizza_ingredients (pizza_id, ingredient_id) VALUES (?, ?)`);
                                ingredientIds.forEach(ingId => stmt.run(id, ingId));
                                stmt.finalize((err) => {
                                    if (err) return reject(err);
                                    Pizzas.getPizzaById(id).then(resolve).catch(reject);
                                });
                            } else {
                                Pizzas.getPizzaById(id).then(resolve).catch(reject);
                            }
                        });
                    } else {
                        // if no ingredientIds in the JSON body, simply return the pizza
                        Pizzas.getPizzaById(id).then(resolve).catch(reject);
                    }
                });
            });
        });
    }

    // Delete
    static deletePizza(id) {
        const sql = `DELETE FROM pizzas WHERE id = ?`;
        return new Promise((resolve, reject) => {
            db.run(sql, [id], function (err) {
                if (err) return reject(err);
                resolve(this.changes);
            });
        });
    }
}

module.exports = Pizzas;