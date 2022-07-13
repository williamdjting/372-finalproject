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
            admin: req.user.username,
            members: [req.user.username],
            stockList: []
        });
        res.json({ success: true });
    } catch (err) {
        res.json({ success: false });
    }
});

router.post('/leave', async (req, res) => {
    try {
        const existingGroup = await Group.findOne({ name: req.body.name });
        if (!existingGroup)
            return res.json({ success: false });

        existingGroup.members = existingGroup.members.filter((member) => member !== req.user.username);
        if (existingGroup.admin === req.user.username)
            await existingGroup.delete();
        else
            await existingGroup.save();

        res.json({ success: true });
    } catch (err) {
        res.json({ success: false });
    }
});

router.post('/delete', async (req, res) => {
    try {
        const existingGroup = await Group.findOne({ name: req.body.name });
        if (!existingGroup)
            return res.json({ success: false });

        if (existingGroup.admin !== req.user.username)
            return res.json({ success: false });

        await existingGroup.delete();
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
