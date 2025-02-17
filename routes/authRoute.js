//Routen für die Registrierung und Login

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {validationRegister, validationLogin} = require('../utils/validation');

router.get('/register', authController.getRegisterPage);
router.post('/register', validationRegister, authController.registerUser);

router.get('/login', authController.getLoginPage);
router.post('/login', validationLogin, authController.loginUser);

module.exports = router;