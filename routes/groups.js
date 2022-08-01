const express = require('express');
const Group = require('../models/group.model');
const router = express.Router();
require('dotenv').config();

router.post('/register', async (req, res) => {
    try {
        const existingGroup = await Group.findOne({ name: req.body.name });
        if (existingGroup)
            return res.json({ success: false, error: "Group already exists!" });

        await Group.create({
            name: req.body.name,
            description: req.body.description,
            admin: req.user.username,
            members: [req.user.username],
            stockList: []
        });
        res.json({ success: true });
    } catch (err) {
        res.json({ success: false, error: "Unknown error!" });
    }
});

router.post('/join', async (req, res) => {
    try {
        const existingGroup = await Group.findOne({ name: req.body.name });
        if (!existingGroup || existingGroup.members.includes(req.user.username))
            return res.json({ success: false });

        existingGroup.members.push(req.user.username);
        await existingGroup.save();
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

        if (existingGroup.members.length === 0) {
            await existingGroup.delete();
            return res.json({ success: true });
        }

        if (existingGroup.admin === req.user.username)
            existingGroup.admin = existingGroup.members[0];

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

router.post('/kick', async (req, res) => {
    try {
        const existingGroup = await Group.findOne({ name: req.body.name });
        if (!existingGroup)
            return res.json({ success: false });

        if (existingGroup.admin !== req.user.username)
            return res.json({ success: false });

        existingGroup.members = existingGroup.members.filter((member) => member !== req.body.kickedMember);
        await existingGroup.save();
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

router.get('/get', async (req, res) => {
    try {
        const existingGroup = await Group.findOne({ name: req.query.name });
        if (!existingGroup)
            return res.json({ success: false });

        res.json({ success: true, group: existingGroup });
    } catch (err) {
        res.json({ success: false });
    }
});

router.get('/getTickerFromGroups', async (req, res) => {
    try {
        const existingGroup = await Group.find({ members: req.user.username });
        if (!existingGroup)
            return res.json({ success: false });

        let groupStockCode = [];
        existingGroup.forEach(obj => {
            obj.stockList.forEach(ticketCode => {
                if (!groupStockCode.includes(ticketCode)) {
                    groupStockCode.push(ticketCode);
                }
            })
        });
        res.json({ success: true, group: groupStockCode });
    } catch (err) {
        res.json({ success: false });
    }
});

router.post('/addstock', async (req, res) => {
    try {
        const existingGroup = await Group.findOne({ name: req.body.name });
        if (!existingGroup)
            return res.json({ success: false });

        if (!existingGroup.stockList.includes(req.body.stock))
            existingGroup.stockList.push(req.body.stock);
        await existingGroup.save();
        res.json({ success: true });
    } catch (err) {
        res.json({ success: false });
    }
});

router.post('/removestock', async (req, res) => {
    try {
        const existingGroup = await Group.findOne({ name: req.body.name });
        if (!existingGroup)
            return res.json({ success: false });

        existingGroup.stockList = existingGroup.stockList.filter((member) => member !== req.body.stock);
        await existingGroup.save();
        res.json({ success: true });
    } catch (err) {
        res.json({ success: false });
    }
});

module.exports = router;
