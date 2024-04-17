const express = require('express');
const router = express.Router();
const saldosController = require('../controller/saldos.controller.js');

router.get('/lista', saldosController.obtenerSaldos);

router.get('/buscar/:UserId', saldosController.buscarSaldo);

router.post('/agregar', saldosController.postSaldo);

router.put('/actualizar/:id', saldosController.actualizarSaldo);
module.exports = router;
