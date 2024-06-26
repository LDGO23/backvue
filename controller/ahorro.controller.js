const sequelize = require("../config/sequelize-config");
const Ahorro  = require('../models/ahorro.model'); 
const Saldos = require('../models/saldos.model');

// Controlador para obtener todos los ahorros
exports.obtenerAhorros = async (req, res) => {
    try {
        const ahorros = await Ahorro.findAll();
        res.status(200).json(ahorros);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los ahorros', });
    }
};

// Controlador para obtener los ahorros de un usuario por su ID
exports.obtenerAhorrosPorUsuario = async (req, res) => {
    try {
        const UserId = req.params.UserId;
        const ahorros = await Ahorro.findAll({
            where: { UserId }
        });
        res.status(200).json(ahorros);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los ahorros del usuario' });
    }
};

// Controlador para crear un nuevo ahorro
exports.crearAhorro = async (req, res) => {
    try {
        const { Cantidad, NombreAhorro, CategoriaId, UserId, SaldoId, ahorroSemana, fechaEstimadaAhorro } = req.body;
        const saldoActual = await Saldos.sum('Cantidad', { where: { UserId } });

        if (saldoActual < Cantidad) {
            return res.status(400).json({ error: "El usuario no tiene saldo suficiente para realizar este gasto" });
          }
      
        const nuevoAhorro = await Ahorro.create({
            Cantidad,
            NombreAhorro,
            CategoriaId,
            UserId,
            SaldoId,
            ahorroSemana,
            fechaEstimadaAhorro
        });
        let saldoActuaal = await Saldos.sum('Cantidad', { where: { UserId } });
        saldoActuaal -= Cantidad;
        await Saldos.update({ Cantidad: saldoActuaal }, { where: { UserId } });
        res.status(201).json(nuevoAhorro);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el nuevo ahorro' });
    }
};
