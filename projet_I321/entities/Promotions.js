// Project:     Projet_I321, module ICT 321 "Programmer des systèmes distribués"
// Teacher:     Mr J. Ithurbide
// Authors:     Kilian Testard & Niels Delafontaine
// Description: API for a Pizza Foodtruck
// Date:        2025-12-18


const db = require('../config/database.js');

class Promotions {

    // Post
    static createPromotion({ pizza_id, percentage, starting_date, end_date }) {
        const sql = `INSERT INTO promotion (pizza_id, percentage, starting_date, end_date)
                 VALUES (?, ?, ?, ?)`;
        const params = [pizza_id, percentage, starting_date, end_date];

        return new Promise((resolve, reject) => {
            db.run(sql, params, function (err) {
                if (err) return reject(err);
                // fetch created row
                Promotions.getPromotionById(this.lastID).then(resolve).catch(reject);
            });
        });
    }

    // Get ALL
    static getAllPromotions() {
        const sql = `SELECT * FROM promotion ORDER by id DESC`;
        return new Promise((resolve, reject) => {
            db.all(sql, [], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    // Get by ID
    static getPromotionById(id) {
        const sql = `SELECT * FROM promotion WHERE id = ?`;
        return new Promise((resolve, reject) => {
            db.get(sql, [id], (err, row) => {
                if (err) return reject(err);
                resolve(row || null);
            });
        });
    }

    // Put
    static updatePromotion(id, { pizza_id, percentage, starting_date, end_date }) {
        const sql = `
            UPDATE promotion
            SET pizza_id = COALESCE(?, pizza_id),
                percentage = COALESCE(?, percentage),
                starting_date = COALESCE(?, starting_date),
                end_date = COALESCE(?, end_date)
            WHERE id = ?
        `;
        const params = [pizza_id, percentage, starting_date, end_date, id];

        return new Promise((resolve, reject) => {
            db.run(sql, params, function (err) {
                if (err) return reject(err);

                // if nothing was modified, then the promotion doesn't exist
                if (this.changes === 0) return resolve(null);

                Promotions.getPromotionById(id).then(resolve).catch(reject);
            });
        });
    }

    // Delete
    static deletePromotion(id) {
        const sql = `DELETE FROM promotion WHERE id = ?`;
        return new Promise((resolve, reject) => {
            db.run(sql, [id], function (err) {
                if (err) return reject(err);
                resolve(this.changes);
            });
        });
    }
}

module.exports = Promotions;