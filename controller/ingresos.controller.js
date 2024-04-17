const sequelize = require("../config/sequelize-config");
const Ingresos = require("../models/ingresos.model")
const CategoriaIngresos = require("../models/categoriaingresos.model")
const Saldos = require('../models/saldos.model');
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
exports.obtenerIngresosPorUsuario = async (req, res) => {
  try {
    const { UserId } = req.params; // Obtener UserId de los parámetros de la solicitud

    // Buscar ingresos filtrados por UserId
    const ingresos = await Ingresos.findAll({
      where: {
        UserId: UserId
      },
      include: {
        model: CategoriaIngresos,
        attributes: ['NombreCategoria'] // Obtener solo el nombre de la categoría
      }
    });
    console.log("SOSQUE"+ingresos)
    // Si no se encontraron ingresos para el usuario
    if (!ingresos || ingresos.length === 0) {
      return res.status(404).json({ error: "No se encontraron ingresos para el usuario especificado" });
    }

    // Retornar los ingresos encontrados
    res.status(200).json(ingresos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los ingresos del usuario" });
  }
};
//Crear los ingresos
exports.crearIngreso = async (req, res) => {
  try {
    const { Cantidad, NombreIngreso, Descripcion, CategoriaId, UserId } = req.body;

    // Crear el nuevo ingreso
    const nuevoIngreso = await Ingresos.create({
      Cantidad,
      NombreIngreso,
      Descripcion,
      CategoriaId,
      UserId
    });

    // Consultar el saldo actual del usuario
    let saldoActual = await Saldos.sum('Cantidad', { where: { UserId } });

    // Si el usuario no tiene ningún registro de saldo, crear uno nuevo
    if (!saldoActual) {
      await Saldos.create({ Cantidad: Cantidad, UserId });
      saldoActual = Cantidad;
    } else {
      // Calcular el nuevo saldo
      saldoActual += Cantidad;
      // Actualizar el saldo del usuario
      await Saldos.update({ Cantidad: saldoActual }, { where: { UserId } });
    }

    // Devolver la respuesta con el nuevo ingreso
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