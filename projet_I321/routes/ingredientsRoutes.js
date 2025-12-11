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