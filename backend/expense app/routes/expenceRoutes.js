
const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.post('/api/expenses', adminController.postExpence);  
  
router.get('/api/expenses', adminController.getExpence);
  
router.delete('/api/expenses/:expenseId',adminController.deleteExpence );

module.exports=router;