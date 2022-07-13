const express = require('express');
const Group = require('../models/group.model');
const router = express.Router();
require('dotenv').config();

router.post('/register', async (req, res) => {
    try {
        const existingGroup = await Group.findOne({ name: req.body.name });
        if (existingGroup)
            return res.json({ success: false });

        await Group.create({
            name: req.body.name,
            description: req.body.description,
            memberUsernames: [req.user.username],
            stockList: []
        });
        res.json({ success: true });
    } catch (err) {
        res.json({ success: false });
    }
});

router.get('/all', async (req, res) => {
    try {
        const groups = await Group.find();
        return res.json({ success: true, groups });
    }
    catch (err) {
        res.json({ success: false });
    }
});

module.exports = router;
