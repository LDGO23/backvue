const express = require('express');
const router = express.Router();
const ahorrosController = require('../controller/ahorro.controller');

// Ruta para obtener todos los ahorros
router.get('/lista', ahorrosController.obtenerAhorros);

// Ruta para obtener los ahorros de un usuario por su ID
router.get('/usuario/:UserId', ahorrosController.obtenerAhorrosPorUsuario);

// Ruta para crear un nuevo ahorro
router.post('/create', ahorrosController.crearAhorro);

module.exports = router;
