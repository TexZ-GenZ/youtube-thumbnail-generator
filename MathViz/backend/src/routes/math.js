const express = require('express');
const router = express.Router();
const math = require('mathjs');

// Example endpoint for basic calculations
router.post('/calculate', (req, res) => {
    try {
        const { expression } = req.body;
        const result = math.evaluate(expression);
        res.json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
