const express = require('express');
const router = express.Router();
const ingredientsController = require('../controllers/ingredientsController');

const { body, param } = require('express-validator');

const createAndUpdateValidations = [
    body('name').isString().notEmpty().withMessage('name is required'),
];

router.get('/ingredients', ingredientsController.getIngredients);
router.post('/ingredients',createAndUpdateValidations, ingredientsController.createIngredient);
module.exports = router;