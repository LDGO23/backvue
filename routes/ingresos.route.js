const express = require('express');
const router = express.Router();
const ingresocontroller = require('../controller/ingresos.controller');

router.get('/lista', ingresocontroller.obtenerIngreso);
router.post('/create', ingresocontroller.crearIngreso);
module.exports = router;
