// Project:     Projet_I321, module ICT 321 "Programmer des systèmes distribués"
// Teacher:     Mr J. Ithurbide
// Authors:     Kilian Testard & Niels Delafontaine
// Description: API for a Pizza Foodtruck
// Date:        2025-12-18


const express = require('express');
const ingredientsController = require('../controllers/ingredientsController');
const { body } = require('express-validator');

const router = express.Router();

// validation rules
const createAndUpdateValidations = [
    body('name').isString().notEmpty().withMessage('name is required'),
];

router.get('/', ingredientsController.getIngredients);
router.get('/:id', ingredientsController.getOneIngredient)
router.post('/',createAndUpdateValidations, ingredientsController.createIngredient);
router.put('/:id', createAndUpdateValidations, ingredientsController.updateIngredient);
router.delete('/:id', ingredientsController.deleteIngredient);

module.exports = router;