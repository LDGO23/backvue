const sequelize = require("../config/sequelize-config");
const categoriaingresos = require("../models/categoriaingresos.model")


exports.obtenerCategorias = async (req, res) => {
  try {
    const Categoria = await categoriaingresos.findAll();
    res.json(Categoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener Categoria ingresos" });
  }
};
