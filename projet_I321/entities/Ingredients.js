const db = require('../config/database.js');

class Ingredients {

    // Post
    static createIngredient({ name }) {
        const sql = `INSERT INTO ingredients (name) VALUES (?)`;
        const params = [name];

        return new Promise((resolve, reject) => {
            db.run(sql, params, function (err) {
                if (err) return reject(err);
                Ingredients.getIngredientById(this.lastID) .then(resolve) .catch(reject);
            });
        });
    }

    // Get ALL
    static getAllIngredients() {
        const sql = `SELECT * FROM ingredients ORDER by id DESC`;
        return new Promise((resolve, reject) => {
            db.all(sql, [], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    // Get by ID
    static getIngredientById(id) {
        const sql = `SELECT * FROM ingredients WHERE id = ?`;
        return new Promise((resolve, reject) => {
            db.get(sql, [id], (err, row) => {
                if (err) return reject(err);
                resolve(row || null);
            });
        });
    }

    // Put
    static updateIngredient(id, name) {
        const sql = `
        UPDATE ingredients
        SET name = COALESCE(?, name),
        WHERE id = ?
        `;
        const params = [name, id];

        return new Promise((resolve, reject) => {
            db.run(sql, params, function (err) {
                if (err) return reject(err);
                if (this.changes === 0) return resolve(null);
                Ingredients.getIngredientById(id) .then(resolve) .catch(reject);
            });
        });
    }

    // Delete
    static deleteIngredient(id) {
        const sql = `DELETE FROM ingredients WHERE id = ?`;
        return new Promise((resolve, reject) => {
            db.run(sql, [id], function (err) {
                if (err) return reject(err);
                resolve(this.changes);
            });
        });
    }
}

module.exports = Ingredients;