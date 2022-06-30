const express = require('express');
const router = express.Router();

const User = require('../models/user.model');

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

    if (user)
        res.json({ status: 'success' });
    else
        res.json({ status: 'failed' });
});

module.exports = router;
