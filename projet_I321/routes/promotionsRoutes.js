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

router.get('/', promotionController.getPromotions);
router.get('/:id', promotionController.getOnePromotion);
router.post('/', createValidations, promotionController.createPromotion);
router.put('/:id', updateValidations, promotionController.updatePromotion)
router.delete('/:id', promotionController.deletePromotion);

module.exports = router;