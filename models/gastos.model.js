const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');
const categoriagasto = require('./categoriagasto.model'); // Corregir la importación del modelo
const Saldos = require('./saldos.model');

const Gastos = sequelize.define('gastos', {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Cantidad: {
    type: DataTypes.INTEGER
  },
  NombreGasto: {
    type: DataTypes.STRING
  },
  Descripcion: {
    type: DataTypes.STRING
  },
  UserId: {
    type: DataTypes.INTEGER,
  },
  CategoriaId: {
    type: DataTypes.INTEGER,
  },

},
{
  tableName: 'gastos',
  timestamps: false,
  freezeTableName: true,
}
);

Gastos.belongsTo(categoriagasto, { foreignKey: 'CategoriaId' }); 
module.exports = Gastos;
