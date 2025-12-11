const db = require('../config/database.js');

class Pizzas {

    // Post
    static createPizza({ name, description, imageUrl, price }) {
        const sql = `INSERT INTO pizzas (name, description, imageUrl, price, created_at, updated_at)
                 VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))`;
        const params = [name, description || null, imageUrl || null, price];

        return new Promise((resolve, reject) => {
            db.run(sql, params, function (err) {
                if (err) return reject(err);
                // fetch created row
                Pizzas.getPizzaById(this.lastID).then(resolve).catch(reject);
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

    // Get all pizzas with ingredients, from ChatGPT
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

    // Put
    static updatePizza(id, { name, description, imageUrl, price }) {
        const sql = `
        UPDATE pizzas
        SET name = COALESCE(?, name),
            description = COALESCE(?, description),
            imageUrl = COALESCE(?, imageUrl),
            price = COALESCE(?, price),
            updated_at = datetime('now')
        WHERE id = ?
        `;
        const params = [name, description, imageUrl, price, id];

        return new Promise((resolve, reject) => {
            db.run(sql, params, function (err) {
                if (err) return reject(err);
                if (this.changes === 0) return resolve(null);
                Pizzas.getPizzaById(id).then(resolve).catch(reject);
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