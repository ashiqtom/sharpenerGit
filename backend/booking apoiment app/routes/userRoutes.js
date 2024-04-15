
const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.post('/api/users', adminController.postUser);

router.get('/api/users', adminController.getUser);

router.delete('/api/users/:userId', adminController.deleteUser);

module.exports = router;