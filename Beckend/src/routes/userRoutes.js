const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rotas de usuário
router.get('/user', userController.getAllUsers);
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.put('/editarUsuario', userController.editarUsuario);
router.delete('/deletarUsuario', userController.deletarUsuario);

module.exports = router;
