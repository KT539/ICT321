const queries = require('../config/queries');

exports.getPizzas = async (req, res) => {
    try {
        const pizzas = await queries.getAllPizzas();
        res.json(pizzas);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getOnePizza = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const pizza = await queries.getPizzaById(id);

        if (!pizza) return res.status(404).json({ error: 'Pizza introuvable' });
        res.json(pizza);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getAllPizzasWithIngredients = async (req, res) => {
    try {
        const PizzasIngredients = await queries.getAllPizzasWithIngredients();
        res.json(PizzasIngredients);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getPromotion = async (req, res) => {
    try {
        const promotion = await queries.getActivePromotions();
        res.json(promotion);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.createPizza = async (req, res) => {
    try {
        const { name, description, imageUrl, price, ingredients } = req.body;

        if (!name || !price) {
            return res.status(400).json({ error: 'Le nom et le prix de la pizza sont requis' });
        }

        // Créer la pizza
        const newPizzaId = await queries.addPizza({ name, description, imageUrl, price });

        // Ajouter les ingrédients si fournis
        if (Array.isArray(ingredients) && ingredients.length > 0) {
            await queries.addIngredientsToPizza(newPizzaId, ingredients);
        }

        res.status(201).json({
            id: newPizzaId,
            name,
            description,
            imageUrl,
            price,
            ingredients: ingredients || []
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.update = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const pizza = await queries.getPizzaById(id);
        if (!pizza) {
            res.status(404).json({ error: 'Pizza introuvable' });
        }
        res.json(pizza);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
