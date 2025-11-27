const express = require('express');
const router = express.Router();
const pizzaController = require('../controllers/pizzaController');

router.get('/pizzas', pizzaController.getPizzas);
router.get('/pizzas/:id', pizzaController.getOnePizza)

module.exports = router;