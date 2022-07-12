const express = require('express');
const Group = require('../models/group.model');
const router = express.Router();
require('dotenv').config();

router.post('/register', async (req, res) => {
    try {
        const existingGroup = await Group.findOne({ name: req.body.name });
        if (existingGroup)
            return res.json({ status: 'failed' });

        await Group.create({
            name: req.body.name,
            description: req.body.description,
            stockList: []
        });
        res.json({ status: 'success' });
    } catch (err) {
        res.json({ status: 'failed' });
    }
});

module.exports = router;
