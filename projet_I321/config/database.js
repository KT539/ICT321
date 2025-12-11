// config/database.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

const dbFile = process.env.DB_FILE
    ? path.join(__dirname, '..', process.env.DB_FILE)
    : path.join(__dirname, '..', 'dev.sqlite');

console.log("Using SQLite file:", dbFile);

const db = new sqlite3.Database(dbFile, (err) => {
    if (err) {
        console.error('Could not connect to sqlite', err);
        process.exit(1);
    }
    console.log('Connected to sqlite database:', dbFile);
});

// tables initialization
const initSql = `
    CREATE TABLE IF NOT EXISTS pizzas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        imageUrl TEXT,
        price REAL NOT NULL,
        created_at DATETIME NOT NULL DEFAULT (datetime('now')),
        updated_at DATETIME NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS ingredients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS pizza_ingredients (
        pizza_id INTEGER NOT NULL,
        ingredient_id INTEGER NOT NULL,
        PRIMARY KEY (pizza_id, ingredient_id),
        FOREIGN KEY (pizza_id) REFERENCES pizzas(id) ON DELETE CASCADE,
        FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS promotion (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pizza_id INTEGER NOT NULL,
        percentage INTEGER NOT NULL,
        starting_date TEXT NOT NULL,
        end_date TEXT NOT NULL,
        FOREIGN KEY (pizza_id) REFERENCES pizzas(id) ON DELETE CASCADE
    );
`;

db.exec(initSql, (err) => {
    if (err) {
        console.error('Failed to initialize database', err);
        process.exit(1);
    }
    console.log('All tables created (if not existing).');
});

module.exports = db;
