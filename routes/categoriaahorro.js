const express = require('express');
const router = express.Router();
const categoriaAhorroController = require('../controller/categoriaahorro.controller');

// Ruta para obtener todas las categorías de ahorro
router.get('/lista', categoriaAhorroController.obtenerCategorias);

module.exports = router;
