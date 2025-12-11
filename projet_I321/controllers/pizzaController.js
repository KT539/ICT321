const { validationResult } = require('express-validator');
const Pizzas = require('../entities/Pizzas');

// Post
exports.createPizza = async (req, res, next) => {
    try {
        // validation result
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // 400 Bad Request for validation problems
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, description, imageUrl, price } = req.body;
        const created = await Pizzas.createPizza({ name, description, imageUrl, price });
        // 201 Created
        return res.status(201).json(created);
    } catch (err) {
        next(err);
    }
};

// Get ALL
exports.getPizzas = async (req, res, next) => {
    try {
        const pizzas = await Pizzas.getAllPizzas();
        // 200 OK
        return res.status(200).json(pizzas);
    } catch (err) {
        next(err);
    }
};

// Get by ID
exports.getOnePizza = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

        const pizza = await Pizzas.getPizzaById(id);
        if (!pizza) return res.status(404).json({ error: 'Pizza not found' });
        return res.status(200).json(pizza);
    } catch (err) {
        next(err);
    }
};

// Get ALL with ingredients
exports.getAllPizzasWithIngredients = async (req, res, next) => {
    try {
        const PizzasWithIngredients = await Pizzas.getAllPizzasWithIngredients();
        return res.status(200).json(PizzasWithIngredients);
    } catch (err) {
        next(err);
    }
};

exports.getIngredientsFromPizza = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

        const pizza = await Pizzas.getPizzaById(id);
        if (!pizza) return res.status(404).json({ error: 'Pizza not found' });

        const ingredients = await Pizzas.getIngredientsByPizzaId(id);
        return res.status(200).json({
            // contraction/spread from ChatGPT
            ...pizza,
            ingredients: ingredients || []
        });
    } catch (err) {
        next(err);
    }
};

// Put
exports.updatePizza = async (req, res, next) => {
    try {
        // validation result
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        const id = Number(req.params.id);
        if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

        const { name, description, imageUrl, price } = req.body;
        const updated = await Pizzas.updatePizza(id, { name, description, imageUrl, price });
        if (!updated) return res.status(404).json({ error: 'Pizza not found' });

        return res.status(200).json(updated);
    } catch (err) {
        next(err);
    }
};

// Delete
exports.deletePizza = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) return res.status(400).json({error: 'Invalid ID'});

        const deleted = await Pizzas.deletePizza(id);
        if (deleted === 0) return res.status(404).json({error: 'Pizza not found'});

        // 204 No Content on successful delete
        return res.status(204).send();
    } catch (err) {
        next(err);
    }
}
