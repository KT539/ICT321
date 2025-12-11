const express = require('express');
const pizzaController = require('../controllers/pizzaController');
const { body, param } = require('express-validator');

const router = express.Router();

// validation rules
const createAndUpdateValidations = [
    body('name').isString().notEmpty().withMessage('name is required'),
    body('description').optional().isString(),
    body('imageUrl').optional().isString().isURL().withMessage('imageUrl must be a valid URL'),
    body('price').isFloat({ gt: 0 }).withMessage('price must be a positive number'),
];

router.get('/', pizzaController.getPizzas);
router.get('/full', pizzaController.getAllPizzasWithIngredients);
router.get('/:id', pizzaController.getOnePizza)
router.get('/:id/ingredients', pizzaController.getIngredientsFromPizza);
router.post('/', createAndUpdateValidations, pizzaController.createPizza);
router.put('/:id', createAndUpdateValidations, pizzaController.updatePizza);
router.delete('/:id', pizzaController.deletePizza)

module.exports = router;