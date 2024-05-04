const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');

router.post('/signup', adminController.postUser);

router.get('/login/:email/:password',adminController.getlogin)

router.post('/expenses', adminController.postExpence);  
  
router.get('/expenses', adminController.getExpence);
  
router.delete('/expenses/:expenseId',adminController.deleteExpence );

module.exports = router;
