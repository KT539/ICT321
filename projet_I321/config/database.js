// database.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../config/products.db');

// 🔥 1. Connexion à SQLite
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Erreur SQLite:', err.message);
        return;
    }
    console.log(`📦 SQLite OK : ${dbPath}`);
});

db.serialize(() => {
    // Activer les foreign keys (nécessaire pour ON DELETE CASCADE)
    db.run('PRAGMA foreign_keys = ON;', (err) => {
        if (err) console.warn("⚠️ Impossible d'activer foreign_keys:", err.message);
    });

    // Table pizzas
    db.run(
        `CREATE TABLE IF NOT EXISTS pizzas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      imageUrl TEXT,
      price REAL NOT NULL,
      created_at DATETIME NOT NULL DEFAULT (datetime('now')),
      updated_at DATETIME NOT NULL DEFAULT (datetime('now'))
    );`,
        (err) => {
            if (err) {
                console.error("❌ Erreur création table 'pizzas':", err.message);
            } else {
                console.log("📁 Table 'pizzas' OK");
            }
        }
    );

    // Table ingredients
    db.run(
        `CREATE TABLE IF NOT EXISTS ingredients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );`,
        (err) => {
            if (err) {
                console.error("❌ Erreur création table 'ingredients':", err.message);
            } else {
                console.log("📁 Table 'ingredients' OK");
            }
        }
    );

    // Table de liaison pizza_ingredients (many-to-many)
    db.run(
        `CREATE TABLE IF NOT EXISTS pizza_ingredients (
      pizza_id INTEGER NOT NULL,
      ingredient_id INTEGER NOT NULL,
      PRIMARY KEY (pizza_id, ingredient_id),
      FOREIGN KEY (pizza_id) REFERENCES pizzas(id) ON DELETE CASCADE,
      FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) ON DELETE CASCADE
    );`,
        (err) => {
            if (err) {
                console.error("❌ Erreur création table 'pizza_ingredients':", err.message);
            } else {
                console.log("📁 Table 'pizza_ingredients' OK");
            }
        }
    );

    // Table promotion
    db.run(
        `CREATE TABLE IF NOT EXISTS promotion (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pizza_id INTEGER NOT NULL,
      percentage INTEGER NOT NULL,
      starting_date TEXT NOT NULL,
      end_date TEXT NOT NULL,
      FOREIGN KEY (pizza_id) REFERENCES pizzas(id) ON DELETE CASCADE
    );`,
        (err) => {
            if (err) {
                console.error("❌ Erreur création table 'promotion':", err.message);
            } else {
                console.log("📁 Table 'promotion' OK");
            }
        }
    );
});


module.exports = db;
