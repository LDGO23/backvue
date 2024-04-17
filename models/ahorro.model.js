const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');

const Ahorro = sequelize.define('Ahorro', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Cantidad: {
        type: DataTypes.INTEGER
    },
    NombreAhorro: {
        type: DataTypes.STRING
    },
    CategoriaId: {
        type: DataTypes.INTEGER
    },
    UserId: {
        type: DataTypes.INTEGER
    },
    SaldoId: {
        type: DataTypes.INTEGER
    },
    CREATED_AT: {
        type: DataTypes.DATE
    },
    ahorroSemana: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    fechaEstimadaAhorro: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'ahorro',
    timestamps: false,
    freezeTableName: true
});

module.exports = Ahorro;
