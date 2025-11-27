const db = require('../config/database.js'); // ton module de connexion MySQL


exports.getAllIngredients = async () => {
    const sql = `
        SELECT * from Ingredients
        ORDER BY id ASC;`;

    const [rows] = await db.query(sql);
    return rows;
<<<<<<< HEAD
};
=======
};
>>>>>>> feature/SelectOnePizza
