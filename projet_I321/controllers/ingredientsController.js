const queries = require('../config/queries');

exports.getIngredients = async (req, res) => {
    try {
        const ingredients = await queries.getAllIngredients();
        res.json(ingredients);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getIngredientsFromPizza = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);

        // Récupérer la pizza
        const pizza = await queries.getPizzaById(id);
        if (!pizza) {
            return res.status(404).json({ error: 'Pizza introuvable' });
        }

        // Récupérer ses ingrédients
        const ingredients = await queries.getIngredientsByPizzaId(id);
        if (!ingredients) {
            return res.status(404).json({ error: 'Ingredients introuvables' });
        }
        // Renvoyer la pizza avec ses ingrédients
        res.json({
            ...pizza,
            ingredients: ingredients
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.createIngredient = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Le nom de l’ingrédient est requis' });
        }

        // Appel à la fonction dans queries.js
        const newIngredientId = await queries.addIngredient(name);

        res.status(201).json({
            id: newIngredientId,
            name
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};