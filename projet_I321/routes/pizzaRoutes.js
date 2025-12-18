// Project:     Projet_I321, module ICT 321 "Programmer des systèmes distribués"
// Teacher:     Mr J. Ithurbide
// Authors:     Kilian Testard & Niels Delafontaine
// Description: API for a Pizza Foodtruck
// Date:        2025-12-18


const express = require('express');
const pizzaController = require('../controllers/pizzaController');
const { body, param } = require('express-validator');

const router = express.Router();

// validation rules for create
const createValidations = [
    body('name').isString().notEmpty().withMessage('name is required'),
    body('description').optional().isString(),
    body('imageUrl').optional().isString().isURL().withMessage('imageUrl must be a valid URL'),
    body('price').isFloat({ gt: 0 }).withMessage('price must be a positive number'),
    body('ingredientIds').isArray().withMessage('ingredientIds must be an array of IDs')
];

// validation rules for update
const updateValidations = [
    body('name').optional().isString().notEmpty().withMessage('name is required'),
    body('description').optional().isString(),
    body('imageUrl').optional().isString().isURL().withMessage('imageUrl must be a valid URL'),
    body('price').optional().isFloat({ gt: 0 }).withMessage('price must be a positive number'),
    body('ingredientIds').optional().isArray().withMessage('ingredientIds must be an array of IDs')
];

/**
 * @openapi
 * tags:
 *   - name: Pizzas
 *     description: Gestion du catalogue de pizzas et de leurs ingrédients
 */

/**
 * @openapi
 * /pizzas:
 *   get:
 *     summary: Liste toutes les pizzas (données de base)
 *     tags:
 *       - Pizzas
 *     responses:
 *       200:
 *         description: Liste des pizzas récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pizza'
 *   post:
 *     summary: Créer une nouvelle pizza avec ses ingrédients
 *     tags:
 *       - Pizzas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               imageUrl:
 *                 type: string
 *               ingredientIds:
 *                 type: array
 *                 description: Liste des IDs des ingrédients à lier
 *                 items:
 *                   type: integer
 *     responses:
 *       201:
 *         description: Pizza créée
 */

/**
 * @openapi
 * /pizzas/full:
 *   get:
 *     summary: Liste toutes les pizzas avec le détail de leurs ingrédients
 *     tags:
 *       - Pizzas
 *     responses:
 *       200:
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 allOf:
 *                   - $ref: '#/components/schemas/Pizza'
 *                   - type: object
 *                     properties:
 *                       ingredients:
 *                         type: array
 *                         items:
 *                           $ref: '#/components/schemas/Ingredient'
 */

/**
 * @openapi
 * /pizzas/promotions:
 *   get:
 *     summary: Liste toutes les pizzas actuellement en promotion avec leurs ingrédients
 *     tags:
 *       - Pizzas
 *     responses:
 *       200:
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 allOf:
 *                   - $ref: '#/components/schemas/Pizza'
 *                   - type: object
 *                     properties:
 *                       percentage: {type: 'integer'}
 *                       starting_date: {type: 'string'}
 *                       end_date: {type: 'string'}
 *                       ingredients:
 *                         type: array
 *                         items:
 *                           $ref: '#/components/schemas/Ingredient'
 */

/**
 * @openapi
 * /pizzas/{id}:
 *   get:
 *     summary: Obtenir une pizza par son ID
 *     tags:
 *       - Pizzas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails de la pizza
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pizza'
 *       404:
 *         description: Pizza non trouvée
 *   put:
 *     summary: Modifier une pizza et synchroniser ses ingrédients
 *     tags:
 *       - Pizzas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               imageUrl:
 *                 type: string
 *               ingredientIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Pizza mise à jour
 *   delete:
 *     summary: Supprimer une pizza
 *     tags:
 *       - Pizzas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Pizza supprimée
 */

/**
 * @openapi
 * /pizzas/{id}/ingredients:
 *   get:
 *     summary: Obtenir une pizza avec sa liste d'ingrédients détaillée
 *     tags:
 *       - Pizzas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pizza et ses ingrédients
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Pizza'
 *                 - type: object
 *                   properties:
 *                     ingredients:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Ingredient'
 */
router.get('/', pizzaController.getPizzas);
router.get('/full', pizzaController.getAllPizzasWithIngredients);
router.get('/promotions', pizzaController.getPizzaOnPromotion);
router.get('/:id', pizzaController.getOnePizza)
router.get('/:id/ingredients', pizzaController.getIngredientsFromPizza);
router.post('/', createValidations, pizzaController.createPizza);
router.put('/:id', updateValidations, pizzaController.updatePizza);
router.delete('/:id', pizzaController.deletePizza)

module.exports = router;