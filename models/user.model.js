const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        stockList: { type: Array, required: true}
    },
    { collection: 'users' }
);

User.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('Users', User);
