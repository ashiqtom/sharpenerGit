const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/attendance',adminController.getReq);

router.post('/attendance',adminController.postReq);

module.exports = router;
