const IngredientsModel = require('../entities/ingredients.js');

exports.getIngredients = async (req, res) => {
    try {
        const ingredients = await IngredientsModel.getAllIngredients();
        res.status(200).json(ingredients);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Unexpected server error." });
    }
};