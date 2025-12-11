const express = require('express');
const pizzasRouter = require('./pizzaRoutes.js');
const ingredientsRouter = require('./ingredientsRoutes.js');
const promotionsRouter = require('./promotionsRoutes.js');

const router = express.Router();

router.use('/pizzas', pizzasRouter);
router.use('/ingredients', ingredientsRouter);
router.use('/promotions', promotionsRouter);

module.exports = router;
