const sequelize = require("../config/sequelize-config");
const Ingresos = require("../models/ingresos.model")

//Obtener los ingresos
exports.obtenerIngreso = async (req, res) => {
  try {
    const Ingreso = await Ingresos.findAll();
    res.json(Ingreso);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener ingresos" });
  }
};

//Crear los ingresos
exports.crearIngreso = async (req, res) => {
  try {
    const { Cantidad, NombreIngreso, Descripcion, CategoriaId, UserId } = req.body;
    const nuevoIngreso = await Ingresos.create({
      Cantidad,
      NombreIngreso,
      Descripcion,
      CategoriaId,
      UserId
    });

    res.status(200).json(nuevoIngreso);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el ingreso" });
  }
};
//Actualizar los ingrsesos
exports.actualizarIngreso = async (req, res) => {
  try {
    const { Id } = req.params;
    const { Cantidad, NombreIngreso, Descripcion, CategoriaId, UserId } = req.body;
    const ingreso = await Ingresos.findByPk(Id);

    if (!ingreso) {
      return res.status(404).json({ error: "El ingreso no existe" });
    }

    ingreso.Cantidad = Cantidad;
    ingreso.NombreIngreso = NombreIngreso;
    ingreso.Descripcion = Descripcion;
    ingreso.CategoriaId = CategoriaId;
    ingreso.UserId = UserId;

    await ingreso.save();

    res.status(200).json(ingreso);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el ingreso" });
  }
};