const express = require('express');
const router = express.Router();
const gastosController = require('../controller/gastos.controller');

// Ruta para obtener todos los gastos
router.get('/lista', gastosController.obtenerGastos);

// Ruta para obtener los gastos de un usuario específico
router.get('/usuario/:UserId', gastosController.obtenerGastosPorUsuario);

// Ruta para crear un nuevo gasto
router.post('/create', gastosController.crearGasto);

// Ruta para actualizar un gasto existente
router.put('/:Id', gastosController.actualizarGasto);

module.exports = router;
