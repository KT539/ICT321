const express = require('express');
const app = express();
const pizzaRoutes = require('./routes/pizzaRoutes');
const ingredientsRoutes = require('./routes/ingredientsRoutes');


// routes
app.use(express.json());
app.use('/', pizzaRoutes);
app.use('/', ingredientsRoutes);

module.exports = app;
