const express = require('express');
const router = express.Router();

const pizzas = [
    {
        id: 1,
        name: 'Margherita',
        description: 'Basic pizza with mozzarella cheese',
        image_url: '../public/images/margherita.jpg',
        ingredients: ['mozzarella cheese']
    },
    {
        id: 2,
        name: '4 seasons',
        description: 'xyz',
        image_url: '../public/images/seasons.jpg',
        ingredients: ['ham', 'fresh mushrooms', 'pepper bells', 'artichokes', 'mozzarella cheese']
    },
    {
        id: 3,
        name: 'La DIAVOLA',
        description: 'xyz',
        image_url: '../public/images/diavola.jpg',
        ingredients: ['Merguez', 'pepperoni', 'pepper bells', 'red onions', 'mozzarella flor di latte']
    }
];

router.get('/', function (req, res) {
    res.json(pizzas);
});

module.exports = router;