const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const router = express.Router();
require('dotenv').config();

router.post('/register', async (req, res) => {
    try {
        await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        res.json({ status: 'success' });
    } catch (err) {
        console.log(err);
        res.json({ status: 'failed' });
    }
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email, password: req.body.password });

    if (user) {
        const token = jwt.sign({
            username: user.username,
            email: user.email,
        }, process.env.JWT_SECRET);
        res.json({ status: 'success', user: token });
    }
    else {
        res.json({ status: 'failed' });
    }
});

module.exports = router;
