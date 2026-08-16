const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/security-question', authController.getSecurityQuestion);
router.post('/reset-password', authController.resetPasswordWithSecurityAnswer);
router.get('/me', authController.getMe);

module.exports = router;
