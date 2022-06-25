var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.json({ 'test': 'this is a message' });
});

module.exports = router;
