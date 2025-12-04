const express = require('express');
const router = express.Router();
const pizzaController = require('../controllers/pizzaController');
const ingredientsController = require('../controllers/ingredientsController');

const { body, param } = require('express-validator');

const createAndUpdateValidations = [
    body('name').isString().notEmpty().withMessage('name is required'),
    body('description').optional().isString(),
    body('imageUrl').optional().isString().isURL().withMessage('imageUrl must be a valid URL'),
    body('price').isFloat({ gt: 0 }).withMessage('price must be a positive number'),
];

router.get('/pizzas', pizzaController.getPizzas);
router.get('/pizzas/ingredients', pizzaController.getAllPizzasWithIngredients);
router.get('/pizzas/:id', pizzaController.getOnePizza)
router.get('/pizzas/:id/ingredients', ingredientsController.getIngredientsFromPizza);
router.get('/promotion', pizzaController.getPromotion);
router.post('/pizzas', createAndUpdateValidations, pizzaController.createPizza);
//router.put('/:id', [param('id').isInt().withMessage('id must be an integer'), ...createAndUpdateValidations], pizzaController.update);
module.exports = router;