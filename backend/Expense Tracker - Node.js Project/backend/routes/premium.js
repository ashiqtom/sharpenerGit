const express = require('express');

const premiumController = require('../controller/premium');

const authenticatemiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/leaderBoard',authenticatemiddleware.authenticate,premiumController.getPremium);

module.exports = router; 