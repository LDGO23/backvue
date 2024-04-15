const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usuario.controller.js');

router.get('/lista', usuarioController.obtenerUsuarios);

router.get('/buscar/:id', usuarioController.buscarUsuario);

router.put('/desactivar/:id', usuarioController.desactivarUsuario);

module.exports = router;
