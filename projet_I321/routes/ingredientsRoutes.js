const express = require('express');
const router = express.Router();
const ingredientsController = require('../controllers/ingredientsController');

router.get('/ingredients', ingredientsController.getIngredients);

module.exports = router;