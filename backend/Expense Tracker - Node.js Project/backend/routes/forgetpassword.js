const express = require('express');

const router = express.Router();

const forgotController = require('../controller/forgotpassword');

router.post('/forgotpassword',forgotController.forgot)

module.exports = router;
 