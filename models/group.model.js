const mongoose = require('mongoose');

const Group = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String },
        memberUsernames: { type: Array, required: true },
        stockList: { type: Array, required: true }
    },
    { collection: 'groups' }
);

module.exports = mongoose.model('Groups', Group);
