// Project:     Projet_I321, module ICT 321 "Programmer des systèmes distribués"
// Teacher:     Mr J. Ithurbide
// Authors:     Kilian Testard & Niels Delafontaine
// Description: API for a Pizza Foodtruck
// Date:        2025-12-18


const express = require('express');
const ingredientsController = require('../controllers/ingredientsController');
const { body } = require('express-validator');

const router = express.Router();

// validation rules
const createAndUpdateValidations = [
    body('name').isString().notEmpty().withMessage('name is required'),
];

/**
 * @openapi
 * tags:
 *   - name: Ingredients
 *     description: Gestion des ingrédients
 */

/**
 * @openapi
 * /ingredients:
 *   get:
 *     summary: Liste tous les ingrédients
 *     tags:
 *       - Ingredients
 *     responses:
 *       200:
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ingredient'
 *   post:
 *     summary: Ajouter un ingrédient
 *     tags:
 *       - Ingredients
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Créé
 */

/**
 * @openapi
 * /ingredients/{id}:
 *   get:
 *     summary: Détails d'un ingrédient
 *     tags:
 *       - Ingredients
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 *       404:
 *         description: Non trouvé
 *   put:
 *     summary: Modifier un ingrédient
 *     tags:
 *       - Ingredients
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
 *     responses:
 *       200:
 *         description: Mis à jour
 *   delete:
 *     summary: Supprimer un ingrédient
 *     tags:
 *       - Ingredients
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Supprimé
 */
router.get('/', ingredientsController.getIngredients);
router.get('/:id', ingredientsController.getOneIngredient)
router.post('/',createAndUpdateValidations, ingredientsController.createIngredient);
router.put('/:id', createAndUpdateValidations, ingredientsController.updateIngredient);
router.delete('/:id', ingredientsController.deleteIngredient);

module.exports = router;