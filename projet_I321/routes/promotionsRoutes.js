const express = require('express');
const promotionController = require('../controllers/promotionController');
const { body } = require('express-validator');

const router = express.Router();

// validation rules
const createAndUpdateValidations = [
    body('pizza_id').isInt({gt:0}).withMessage('pizza_id must be a positive integer.'),
    body('percentage').isInt({gt:0}).withMessage('percentage must be a positive integer.'),
    body('starting_date').isString().notEmpty().withMessage('starting date is required.'),
    body('end_date').isString().notEmpty().withMessage('ending date is required.'),
];

router.get('/', promotionController.getPromotions);
router.get('/:id', promotionController.getOnePromotion);
router.post('/', createAndUpdateValidations, promotionController.createPromotion);
router.put('/:id', createAndUpdateValidations, promotionController.updatePromotion)
router.delete('/:id', promotionController.deletePromotion);

module.exports = router;