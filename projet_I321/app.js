const express = require('express');
const app = express();
const pizzaRoutes = require('./routes/pizzaRoutes');


// routes
app.use(express.json());
app.use('/', pizzaRoutes);

module.exports = app;
