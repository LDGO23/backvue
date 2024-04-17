const sequelize = require("../config/sequelize-config");
const categoriagasto = require("../models/categoriagasto.model")


exports.obtenerCategorias = async (req, res) => {
  try {
    const Categoria = await categoriagasto.findAll();
    res.json(Categoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener Categoria gasto" });
  }
};
