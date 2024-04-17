const sequelize = require("../config/sequelize-config");
const Gastos = require("../models/gastos.model")
const categoriagasto = require("../models/categoriagasto.model")
const Saldos = require('../models/saldos.model');



exports.obtenerGastos = async (req, res) => {
  try {
    const gastos = await Gastos.findAll();
    res.json(gastos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener sas gastos",details: error.message });
  }
};

// Obtener los gastos por usuario
exports.obtenerGastosPorUsuario = async (req, res) => {
  try {
    const { UserId } = req.params;
    const gastos = await Gastos.findAll({
      where: {
        UserId: UserId
      },
      include: {
        model: categoriagasto,
        attributes: ['NombreCategoria']
      }
    });

    if (!gastos || gastos.length === 0) {
      return res.status(404).json({ error: "No se encontraron gastos para el usuario especificado" });
    }

    res.status(200).json(gastos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los gastos del usuario",details: error.message });
  }
};

// Crear un gasto
exports.crearGasto = async (req, res) => {
  try {
    const { Cantidad, NombreGasto, Descripcion, CategoriaId, UserId } = req.body;
    const saldoActual = await Saldos.sum('Cantidad', { where: { UserId } });

    if (saldoActual < Cantidad) {
      return res.status(400).json({ error: "El usuario no tiene saldo suficiente para realizar este gasto" });
    }

    const nuevoGasto = await Gastos.create({
      Cantidad,
      NombreGasto,
      Descripcion,
      CategoriaId,
      UserId
    });
    let saldoActuaal = await Saldos.sum('Cantidad', { where: { UserId } });
    saldoActuaal -= Cantidad;
    await Saldos.update({ Cantidad: saldoActuaal }, { where: { UserId } });

    res.status(200).json(nuevoGasto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el gasto", details: error.message});
  }
};

// Actualizar un gasto
exports.actualizarGasto = async (req, res) => {
  try {
    const { Id } = req.params;
    const { Cantidad, NombreGasto, Descripcion, CategoriaId, UserId } = req.body;
    const gasto = await Gastos.findByPk(Id);

    if (!gasto) {
      return res.status(404).json({ error: "El gasto no existe" });
    }

    const saldoActual = await Saldos.sum('Cantidad', { where: { UserId } });

    if (saldoActual < Cantidad) {
      return res.status(400).json({ error: "El usuario no tiene saldo suficiente para realizar este gasto" });
    }

    gasto.Cantidad = Cantidad;
    gasto.NombreGasto = NombreGasto;
    gasto.Descripcion = Descripcion;
    gasto.CategoriaId = CategoriaId;
    gasto.UserId = UserId;

    await gasto.save();

    // Actualizar el saldo del usuario
    await Saldos.create({ Cantidad: -Cantidad, UserId });

    res.status(200).json(gasto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el gasto" });
  }
};
