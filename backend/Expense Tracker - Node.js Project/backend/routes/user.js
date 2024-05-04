const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');
const userAuthentication =require('../middleware/auth')

router.post('/signup', adminController.postUser);

router.get('/login/:email/:password',adminController.getlogin)
  
router.get('/expenses', userAuthentication.authenticate ,adminController.getExpence);

router.post('/expenses', userAuthentication.authenticate ,adminController.postExpence);  
  
router.delete('/expenses/:expenseId', userAuthentication.authenticate ,adminController.deleteExpence );

module.exports = router;
