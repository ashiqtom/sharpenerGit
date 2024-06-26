const express=require('express');

const router=express.Router();

const productController=require('../controllers/product');

//admin/add-product -with GET 
router.get('/add-product',  productController.getAddProduct);

//admin/add-product -with POST
router.post('/add-product',productController.postAddProduct);

module.exports=router;    