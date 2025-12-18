// Project:     Projet_I321, module ICT 321 "Programmer des systèmes distribués"
// Teacher:     Mr J. Ithurbide
// Authors:     Kilian Testard & Niels Delafontaine
// Description: API for a Pizza Foodtruck
// Date:        2025-12-18


const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API projet_I321 Foodtruck-pizzeria',
            version: '1.0.0',
            description: 'Documentation interactive de l\'API Pizza',
        },
        components: {
            schemas: {
                Pizza: {
                    type: 'object',
                    properties: {
                        id: {type: 'integer'},
                        name: {type: 'string'},
                        description: {type: 'string'},
                        price: {type: 'number'},
                        imageUrl: {type: 'string'}
                    }
                },
                Ingredient: {
                    type: 'object',
                    properties: {
                        id: {type: 'integer'},
                        name: {type: 'string'}
                    }
                },
                Promotion: {
                    type: 'object',
                    properties: {
                        id: {type: 'integer'},
                        pizza_id: {type: 'integer'},
                        percentage: {type: 'integer'},
                        start_date: {type: 'text'},
                        end_date: {type: 'text'}
                    }
                }
            }
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Serveur de développement',
            },
        ],
    },
    apis: ['./routes/*.js'],
};

module.exports = swaggerJsdoc(options);