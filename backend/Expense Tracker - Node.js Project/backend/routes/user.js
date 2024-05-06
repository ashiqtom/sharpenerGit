const express = require('express');

const router = express.Router();

const userController = require('../controller/user');

router.post('/signup', userController.postUser);

router.get('/login/:email/:password',userController.getlogin)

module.exports = router;
 