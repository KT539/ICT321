const mysql = require('mysql2/promise');

// created a Pool on ChatGPT's advice
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'projet_foodtruck'
});

module.exports = db;