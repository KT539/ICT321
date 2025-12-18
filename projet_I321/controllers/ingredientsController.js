// Project:     Projet_I321, module ICT 321 "Programmer des systèmes distribués"
// Teacher:     Mr J. Ithurbide
// Authors:     Kilian Testard & Niels Delafontaine
// Description: API for a Pizza Foodtruck
// Date:        2025-12-18


const { validationResult } = require('express-validator');
const Ingredients = require('../entities/Ingredients');

// Post
exports.createIngredient = async (req, res, next) => {
    try {
        // validation result
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // 400 Bad Request for validation problems
            return res.status(400).json({ errors: errors.array() });
        }

        const { name } = req.body;
        const created = await Ingredients.createIngredient({ name });
        // 201 Created
        return res.status(201).json(created);
    } catch (err) {
        next(err);
    }
};

// Get ALL
exports.getIngredients = async (req, res, next) => {
    try {
        const ingredients = await Ingredients.getAllIngredients();
        // 200 OK
        return res.status(200).json(ingredients);
    } catch (err) {
        next(err);
    }
};

// Get by ID
exports.getOneIngredient = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid ID'})

        const ingredient = await Ingredients.getIngredientById(id);
        if (!ingredient) return res.status(404).json({ error: 'Ingredient not found' });

        return res.status(200).json(ingredient);
    } catch (err) {
        next(err);
    }
}

// Put
exports.updateIngredient = async (req, res, next) => {
    try {
        // validation result
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        const id = Number(req.params.id);
        if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

        const { name } = req.body;
        const updated = await Ingredients.updateIngredient(id, name);
        if (!updated) return res.status(404).json({ error: 'Ingredient not found' });

        return res.status(200).json(updated);
    } catch (err) {
        next(err);
    }
};

// Delete
exports.deleteIngredient = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) return res.status(400).json({error: 'Invalid ID'});

        const deleted = await Ingredients.deleteIngredient(id);
        if (deleted === 0) return res.status(404).json({error: 'Ingredient not found'});

        // 204 No Content on successful delete
        return res.status(204).send();
    } catch (err) {
        next(err);
    }
}
