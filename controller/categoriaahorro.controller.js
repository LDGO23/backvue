const sequelize = require('../config/sequelize-config');
const CategoriaAhorro = require('../models/categoriaahorro.model');

exports.obtenerCategorias = async (req, res) => {
  try {
    const categorias = await CategoriaAhorro.findAll();
    res.json(categorias);
  } catch (error) {
    console.error("Error al obtener categorías de ahorro:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
