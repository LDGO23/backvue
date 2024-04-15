const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');
const CategoriaIngresos = require('./categoriaingresos.model');

const Ingresos = sequelize.define('Ingresos', {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Cantidad: {
    type: DataTypes.INTEGER
  },
  NombreIngreso: {
    type: DataTypes.STRING
  },
  Descripcion: {
    type: DataTypes.STRING
  },
  CategoriasId: {
    type: DataTypes.INTEGER,
  },
  UserId: {
    type: DataTypes.INTEGER,
  },
},
{
  tableName: 'categoriaingresos',
  timestamps: false,
  freezeTableName: true,
}
);

Ingresos.belongsTo(CategoriaIngresos, { foreignKey: 'CategoriaId' });

module.exports = Ingresos;