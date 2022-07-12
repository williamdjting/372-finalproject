const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const router = express.Router();
const bcrypt = require('bcrypt');
require('dotenv').config();

router.post('/register', async (req, res) => {
    try {
        const existingUser = await User.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] });
        if (existingUser)
            return res.json({ status: 'failed' });

        await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            stockCodes: []
        });
        res.json({ status: 'success' });
    } catch (err) {
        res.json({ status: 'failed' });
    }
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: 90000000 });
        res.json({ auth: true, profile: { user: user, token: token } });
    } else {
        res.json({ auth: false });
    }
});

router.get('/isLoggedIn', HasToken, async (req, res) => {
    if (req.user)
        return res.json({ auth: true });
    else
        return res.json({ auth: false });
});

function HasToken(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token)
        return res.json({ auth: false });

    try {
        const jwtUser = jwt.verify(token, process.env.JWT_SECRET);
        req.user = jwtUser.user;
        next();
    } catch (error) {
        return res.json({ auth: false });
    }
};

module.exports = {
    routes: router,
    HasToken: HasToken
};