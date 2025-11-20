const PizzaModel = require('../entities/pizzas.js');

exports.getPizzas = async (req, res) => {
    try {
        const pizzas = await PizzaModel.getAllPizzas();
        res.json(pizzas);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Unexpected server error." });
    }
};