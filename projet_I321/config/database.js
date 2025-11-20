const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'projet_foodtruck'
});

db.connect(err => {
    if (err) {
        console.error('MySQL connection error :', err);
        return;
    }
    console.log('Connected to MySQL');
});

module.exports = db;