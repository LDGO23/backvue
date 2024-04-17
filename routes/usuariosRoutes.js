const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usuario.controller');

router.get('/lista', usuarioController.obtenerUsuarios);

router.get('/buscar/:id', usuarioController.buscarUsuario);

router.post('/login', usuarioController.login);

router.post('/registro', usuarioController.registro);

router.put('/desactivar/:id', usuarioController.desactivarUsuario);

module.exports = router;
