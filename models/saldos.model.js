const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');

const Saldos = sequelize.define('Saldos', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Cantidad: {
        type: DataTypes.INTEGER
    },
    UserId: {
        type: DataTypes.INTEGER
    },
    IngresoId: {
        type: DataTypes.INTEGER
    },
},
{
    tableName: 'saldo',
    timestamps: false,
    freezeTableName: true,
}
);

module.exports = Saldos;