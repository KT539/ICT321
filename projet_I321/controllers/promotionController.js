const { validationResult } = require('express-validator');
const Promotions = require('../entities/Promotions');

// Post
exports.createPromotion = async (req, res, next) => {
    try {
        // validation result
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // 400 Bad Request for validation problems
            return res.status(400).json({ errors: errors.array() });
        }

        const { pizza_id, percentage, starting_date, end_date } = req.body;
        const created = await Promotions.createPromotion({ pizza_id, percentage, starting_date, end_date });
        // 201 Created
        return res.status(201).json(created);
    } catch (err) {
        next(err);
    }
};

// Get ALL
exports.getPromotions = async (req, res, next) => {
    try {
        const promotions = await Promotions.getAllPromotions();
        // 200 OK
        return res.status(200).json(promotions);
    } catch (err) {
        next(err);
    }
};

// Get by ID
exports.getOnePromotion = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

        const promotion = await Promotions.getPromotionById(id);
        if (!promotion) return res.status(404).json({ error: 'Promotion not found' });
        return res.status(200).json(promotion);
    } catch (err) {
        next(err);
    }
};

// Put
exports.updatePromotion = async (req, res, next) => {
    try {
        // validation result
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        const id = Number(req.params.id);
        if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

        const { pizza_id, percentage, starting_date, end_date } = req.body;
        const updated = await Promotions.updatePromotion(id, { pizza_id, percentage, starting_date, end_date });
        if (!updated) return res.status(404).json({ error: 'Promotion not found' });

        return res.status(200).json(updated);
    } catch (err) {
        next(err);
    }
};

// Delete
exports.deletePromotion = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) return res.status(400).json({error: 'Invalid ID'});

        const deleted = await Promotions.deletePromotion(id);
        if (deleted === 0) return res.status(404).json({error: 'Promotion not found'});

        // 204 No Content on successful delete
        return res.status(204).send();
    } catch (err) {
        next(err);
    }
}
