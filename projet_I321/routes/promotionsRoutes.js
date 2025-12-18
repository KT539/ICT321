// Project:     Projet_I321, module ICT 321 "Programmer des systèmes distribués"
// Teacher:     Mr J. Ithurbide
// Authors:     Kilian Testard & Niels Delafontaine
// Description: API for a Pizza Foodtruck
// Date:        2025-12-18


const express = require('express');
const promotionController = require('../controllers/promotionController');
const { body } = require('express-validator');

const router = express.Router();

// validation rules for create
const createValidations = [
    body('pizza_id').isInt({gt:0}).withMessage('pizza_id must be a positive integer.'),
    body('percentage').isInt({gt:0, lt:100}).withMessage('percentage must be between 1 and 99.'),
    body('starting_date').isString().notEmpty().withMessage('starting date is required.'),
    body('end_date').isString().notEmpty().withMessage('ending date is required.')
];

// validation rules for update
const updateValidations = [
    body('pizza_id').optional().isInt({gt:0}).withMessage('pizza_id must be a positive integer.'),
    body('percentage').optional().isInt({gt:0, lt:100}).withMessage('percentage must be between 1 and 99.'),
    body('starting_date').optional().isString().notEmpty().withMessage('starting date is required.'),
    body('end_date').optional().isString().notEmpty().withMessage('ending date is required.')
]

/**
 * @openapi
 * tags:
 *   - name: Promotions
 *     description: Gestion des promotions sur les pizzas
 */

/**
 * @openapi
 * /promotions:
 *   get:
 *     summary: Liste toutes les promotions
 *     tags:
 *       - Promotions
 *     responses:
 *       200:
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Promotion'
 *   post:
 *     summary: Créer une nouvelle promotion
 *     tags:
 *       - Promotions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pizza_id
 *               - percentage
 *               - starting_date
 *               - end_date
 *             properties:
 *               pizza_id:
 *                 type: integer
 *               percentage:
 *                 type: integer
 *               starting_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Promotion créée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Promotion'
 */

/**
 * @openapi
 * /promotions/{id}:
 *   get:
 *     summary: Détails d'une promotion
 *     tags:
 *       - Promotions
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
 *               $ref: '#/components/schemas/Promotion'
 *       404:
 *         description: Promotion non trouvée
 *   put:
 *     summary: Modifier une promotion (mise à jour partielle acceptée)
 *     tags:
 *       - Promotions
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
 *               pizza_id:
 *                 type: integer
 *               percentage:
 *                 type: integer
 *               starting_date:
 *                 type: string
 *               end_date:
 *                 type: string
 *     responses:
 *       200:
 *         description: Promotion mise à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Promotion'
 *   delete:
 *     summary: Supprimer une promotion
 *     tags:
 *       - Promotions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Promotion supprimée
 */
router.get('/', promotionController.getPromotions);
router.get('/:id', promotionController.getOnePromotion);
router.post('/', createValidations, promotionController.createPromotion);
router.put('/:id', updateValidations, promotionController.updatePromotion)
router.delete('/:id', promotionController.deletePromotion);

module.exports = router;