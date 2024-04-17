const sequelize = require('../config/sequelize-config');
const Saldos = require('../models/saldos.model');
const Ingresos = require('../models/ingresos.model');
const Usuario = require('../models/usuario.model');



exports.obtenerSaldos = async (req, res) => {
  try {
    const saldos = await Saldos.findAll();
    res.json(saldos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

exports.buscarSaldo = async (req, res) => {
    try {
        const UserId = req.params.UserId; // Cambiar a req.params.userId para obtener el userId de los parámetros

        const saldo = await Saldos.findOne({
            where: {
                UserId: UserId // Buscar por UserId en lugar de Id
            }
        });

        if (!saldo) {
            return res.status(404).json({ message: 'No existe el saldo para el usuario especificado' });
        }

        return res.status(200).json({ success: true, data: saldo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener saldo", details: error.message });
    }
}


exports.postSaldo = async (req, res) => {
    try {
        const { UserId, Saldo, Cantidad, IngresoId } = req.body;

        const ingreso = await Ingresos.findByPk(IngresoId);

        if (!ingreso) {
            return res.status(404).json({ error: 'Ingreso no encontrado' });
        }

        const saldo = await Saldos.create({
            UserId,
            Saldo,
            Cantidad,
            IngresoId
        });

        return res.status(200).json({ success: true, message: 'Saldo creado', data: saldo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear saldo" });
    }
}

exports.actualizarSaldo = async (req, res) => {
    try {
        const saldoBody = req.body;

        const saldo = await Saldos.findByPk(saldoBody.Id);

        if (!saldo) {
            return res.status(404).json({ error: 'Saldo no encontrado' });
        }

        await saldo.update(saldoBody);

        return res.status(200).json({ success: true, message: 'Saldo actualizado' });


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar saldo" });
    }
}