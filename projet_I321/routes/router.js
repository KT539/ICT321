// Project:     Projet_I321, module ICT 321 "Programmer des systèmes distribués"
// Teacher:     Mr J. Ithurbide
// Authors:     Kilian Testard & Niels Delafontaine
// Description: API for a Pizza Foodtruck
// Date:        2025-12-18


const express = require('express');
const pizzasRouter = require('./pizzaRoutes.js');
const ingredientsRouter = require('./ingredientsRoutes.js');
const promotionsRouter = require('./promotionsRoutes.js');

const router = express.Router();

router.use('/pizzas', pizzasRouter);
router.use('/ingredients', ingredientsRouter);
router.use('/promotions', promotionsRouter);

module.exports = router;
