
const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.post('/players', adminController.postPlayer);  
  
router.get('/players/name/:name', adminController.getPlayerByName);
  
router.get('/players/id/:id',adminController.getPlayerById);

router.delete('/players/:id',adminController.deletePlayer);

module.exports=router;