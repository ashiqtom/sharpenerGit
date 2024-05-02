const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');

router.post('/signup', adminController.postUser);

module.exports = router;
