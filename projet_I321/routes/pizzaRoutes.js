// Project:     Projet_I321, module ICT 321 "Programmer des systèmes distribués"
// Teacher:     Mr J. Ithurbide
// Authors:     Kilian Testard & Niels Delafontaine
// Description: API for a Pizza Foodtruck
// Date:        2025-12-18


const express = require('express');
const pizzaController = require('../controllers/pizzaController');
const { body, param } = require('express-validator');

const router = express.Router();

// validation rules for create
const createValidations = [
    body('name').isString().notEmpty().withMessage('name is required'),
    body('description').optional().isString(),
    body('imageUrl').optional().isString().isURL().withMessage('imageUrl must be a valid URL'),
    body('price').isFloat({ gt: 0 }).withMessage('price must be a positive number'),
    body('ingredientIds').isArray().withMessage('ingredientIds must be an array of IDs')
];

// validation rules for update
const updateValidations = [
    body('name').optional().isString().notEmpty().withMessage('name is required'),
    body('description').optional().isString(),
    body('imageUrl').optional().isString().isURL().withMessage('imageUrl must be a valid URL'),
    body('price').optional().isFloat({ gt: 0 }).withMessage('price must be a positive number'),
    body('ingredientIds').optional().isArray().withMessage('ingredientIds must be an array of IDs')
];

router.get('/', pizzaController.getPizzas);
router.get('/full', pizzaController.getAllPizzasWithIngredients);
router.get('/:id', pizzaController.getOnePizza)
router.get('/:id/ingredients', pizzaController.getIngredientsFromPizza);
router.post('/', createValidations, pizzaController.createPizza);
router.put('/:id', updateValidations, pizzaController.updatePizza);
router.delete('/:id', pizzaController.deletePizza)

module.exports = router;