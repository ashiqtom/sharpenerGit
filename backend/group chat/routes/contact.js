const express=require('express');

const router=express.Router();

const contactController=require('../controllers/contact');

router.get('/contact',contactController.getContact);

router.get('/success', contactController.getSuccess);

module.exports=router;