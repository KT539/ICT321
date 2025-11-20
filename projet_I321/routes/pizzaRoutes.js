const express = require('express');
const router = express.Router();
const pizzaController = require('../controllers/pizzaController');

router.get('/pizzas', pizzaController.getPizzas);

module.exports = router;