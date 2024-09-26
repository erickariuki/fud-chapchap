const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/userController');  // Correct path to userController

router.post('/login', UsersController.login);  // Ensure login is defined
router.post('/signup', UsersController.signup);  // Ensure signup is defined
router.get('/profile', UsersController.getProfile);  // Ensure getProfile is defined
router.put('/profile', UsersController.updateProfile);  // Ensure updateProfile is defined
router.delete('/profile', UsersController.deleteAccount);  // Ensure deleteAccount is defined

module.exports = router;
