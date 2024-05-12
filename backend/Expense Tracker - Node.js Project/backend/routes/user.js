const express = require('express');

const router = express.Router();

const userController = require('../controller/user');

const authenticatemiddleware = require('../middleware/auth');

router.post('/signup', userController.signupUser);

router.get('/login/:email/:password',userController.loginUser);

router.get('/download',authenticatemiddleware.authenticate,userController.download);

router.get('/downloadRecoard',authenticatemiddleware.authenticate,userController.downloadRecoard);

module.exports = router;
 