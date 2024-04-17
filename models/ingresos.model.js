const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');
const CategoriaIngresos = require('./categoriaingresos.model'); // Corregir la importación del modelo

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
    references: { model: CategoriaIngresos, key: 'Id' } // Establecer la referencia a la tabla categoriaingresos
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

Ingresos.belongsTo(CategoriaIngresos, { foreignKey: 'CategoriaId' }); 

module.exports = Ingresos;
