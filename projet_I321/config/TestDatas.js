const db = require('./database'); // adapte si ton fichier db.js est ailleurs

db.serialize(() => {
    console.log("🚀 Début de l’insertion de données...\n");

    // --- INGREDIENTS ---
    const ingredients = [
        "Tomate",
        "Mozzarella",
        "Jambon",
        "Champignons",
        "Basilic"
    ];

    db.run("DELETE FROM pizza_ingredients;");
    db.run("DELETE FROM promotion;");
    db.run("DELETE FROM pizzas;");
    db.run("DELETE FROM ingredients;");

    const insertIngredient = db.prepare("INSERT INTO ingredients (name) VALUES (?);");

    ingredients.forEach((name) => {
        insertIngredient.run(name);
    });
    insertIngredient.finalize(() => console.log("🍅 Ingrédients insérés !"));

    // --- PIZZAS ---
    const pizzas = [
        {
            name: "Margherita",
            description: "Tomate, mozzarella, basilic",
            imageUrl: "/images/margherita.jpg",
            price: 12.50
        },
        {
            name: "Reine",
            description: "Tomate, mozzarella, jambon, champignons",
            imageUrl: "/images/reine.jpg",
            price: 14.90
        },
        {
            name: "Napolitaine",
            description: "Tomate, mozzarella, olives, anchois",
            imageUrl: "/images/napolitaine.jpg",
            price: 15.50
        }
    ];

    const insertPizza = db.prepare(
        "INSERT INTO pizzas (name, description, imageUrl, price) VALUES (?, ?, ?, ?);"
    );

    pizzas.forEach((p) => {
        insertPizza.run(p.name, p.description, p.imageUrl, p.price);
    });

    insertPizza.finalize(() => console.log("🍕 Pizzas insérées !"));

    // --- LIENS pizza ↔ ingrédients ---
    const pizzaIngredients = [
        // Margherita = pizza_id 1
        { pizza: 1, ingredients: [1, 2, 5] },    // Tomate, Mozza, Basilic

        // Reine = pizza_id 2
        { pizza: 2, ingredients: [1, 2, 3, 4] }, // Tomate, Mozza, Jambon, Champi

        // Napolitaine = pizza_id 3
        { pizza: 3, ingredients: [1, 2] }        // Tomate, Mozza
    ];

    const insertLink = db.prepare(
        "INSERT INTO pizza_ingredients (pizza_id, ingredient_id) VALUES (?, ?);"
    );

    pizzaIngredients.forEach((p) => {
        p.ingredients.forEach((idIng) => {
            insertLink.run(p.pizza, idIng);
        });
    });

    insertLink.finalize(() => console.log("🔗 Associations pizza-ingredients insérées !"));

    // --- PROMOTION ---
    const insertPromo = db.prepare(
        `INSERT INTO promotion (pizza_id, percentage, starting_date, end_date)
         VALUES (?, ?, ?, ?);`
    );

    insertPromo.run(
        2,        // pizza_id = Reine
        20,       // -20%
        "2024-01-01",
        "2030-01-01"
    );

    insertPromo.finalize(() => console.log("🔥 Promotion insérée !"));

    console.log("\n✅ Données de test insérées avec succès !");
});
