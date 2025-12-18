// Project:     Projet_I321, module ICT 321 "Programmer des systèmes distribués"
// Teacher:     Mr J. Ithurbide
// Authors:     Kilian Testard & Niels Delafontaine
// Description: API for a Pizza Foodtruck
// Date:        2025-12-18


require('dotenv').config();

const express = require('express');
const app = express();

const mainRouter = require('./routes/router');

// middleware
app.use(express.json());

// routes
app.use('/', mainRouter);

module.exports = app;
