const express = require('express');
const router = express.Router();
const categoriaingresosController = require('../controller/categoriaingresos.controller');

router.get('/lista', categoriaingresosController.obtenerCategorias);


module.exports = router;
