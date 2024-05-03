const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');

router.post('/signup', adminController.postUser);

router.get('/login/:email/:password',adminController.getlogin)

module.exports = router;