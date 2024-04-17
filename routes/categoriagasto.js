const express = require('express');
const router = express.Router();
const categoriagastoController = require('../controller/categoriagasto.controller');

router.get('/lista', categoriagastoController.obtenerCategorias);
module.exports = router;
