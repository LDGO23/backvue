const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');
const CategoriaIngresos = require('.//categoriaingresos.model');

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
  CategoriaId: {
    type: DataTypes.INTEGER,
  },
  UserId: {
    type: DataTypes.INTEGER,
  },
},
{
  tableName: 'ingresos',
  timestamps: false,
  freezeTableName: true,
}
);

Ingresos.belongsTo(CategoriaIngresos, { foreignKey: 'Id' });

module.exports = Ingresos;
