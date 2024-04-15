const sequelize = require('../config/sequelize-config');
const Saldos = require('../models/Saldos.model');
const Usuario = require('../models/usuario.model');

exports.obtenerSaldos = async (req, res) => {
    try {
        const [saldos, validarUsuariosConSaldo] = await Promise.all([
            Saldos.findAll(),
            Usuario.findOne({
                where: {
                    Estatus: 1,
                }
            })
        ]);
        
        if(!validarUsuariosConSaldo){
            return res.status(404).json({ message: 'No hay usuarios con saldo' });
        }
        
        if(saldos.length < 1) {
            return res.status(404).json({ message: 'No hay saldos existentes' });
        }

       return res.status(200)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener saldos" });
    }
};

exports.buscarSaldo = async (req, res) => {
    try {
        const id = req.params.id;

        const saldo = await Saldos.findOne({
            where: {
                Id: id
            }
        });

        if(!saldo) {
            return res.status(404).json({ message: 'No existe el saldo' });
        }

        return res.status(200).json({ success: true, data: saldo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener saldo" });
    }
}

exports.postSaldo = async (req, res) => {
    try {
        const { IdUsuario, Saldo } = req.body;

        const saldo = await Saldos.create({
            IdUsuario,
            Saldo,
            Cantidad
        });

        return res.status(200).json({ success: true, message: 'Saldo creado', data: saldo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear saldo" });
    }
}
