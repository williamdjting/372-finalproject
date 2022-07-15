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
            return res.json({ success: false, error: "User email and username already exists!" });

        await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            stockCodes: []
        });
        res.json({ success: true });
    } catch (err) {
        res.json({ success: false, error: "Unknown error!" });
    }
});

router.post('/login', async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        user.password = undefined; // Don't sign JWT with the hashed password.
        const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: 900000000 });
        res.cookie('token', token);
        res.json({ success: true });
    } else {
        res.json({ success: false, error: "Invalid email or password!" });
    }
});

router.get('/isLoggedIn', HasToken, async (req, res) => {
    if (req.user)
        return res.json({ success: true, profile: req.user });
    else
        return res.json({ success: false });
});

function HasToken(req, res, next) {
    const token = req.cookies.token;
    if (!token)
        return res.json({ success: false });

    try {
        const jwtUser = jwt.verify(token, process.env.JWT_SECRET);
        req.user = jwtUser.user;
        next();
    } catch (error) {
        return res.json({ success: false });
    }
};

module.exports = {
    routes: router,
    HasToken: HasToken
};