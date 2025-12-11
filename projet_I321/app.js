require('dotenv').config();

const express = require('express');
const app = express();

const pizzaRoutes = require('./routes/pizzaRoutes');
const ingredientsRoutes = require('./routes/ingredientsRoutes');

// middleware
app.use(express.json());

// routes
app.use('/', pizzaRoutes);
app.use('/', ingredientsRoutes);

module.exports = app;
