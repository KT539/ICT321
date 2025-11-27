const PizzaModel = require('../entities/pizzas.js');
const OnePizzaModel = require('../entities/OnePizza.js');

exports.getPizzas = async (req, res) => {
    try {
        const pizzas = await PizzaModel.getAllPizzas();
        res.status(200).json(pizzas);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Unexpected server error." });
    }
};

exports.getOnePizza = async (req, res) => {
    try {
        const id = req.params.id;
        const pizza = await OnePizzaModel.getOnePizza(id);

        if (!pizza) {
            return res.status(404).json({ error: "Pizza introuvable" });
        }

        res.status(200).json(pizza);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Unexpected server error." });
    }
};