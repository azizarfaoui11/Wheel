const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController'); 

// Existing user routes
router.post('/CreateUser', UserController.createUser);
router.put('/UpdateUser/:id', UserController.updateUser);

// Add the route to update rewards
router.post('/updateRewards', UserController.updateRewards);

module.exports = router;
