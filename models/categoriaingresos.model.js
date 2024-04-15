const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');

const categoriaingresos = sequelize.define('categoriaingresos', {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  NombreCategoria: {
    type: DataTypes.STRING
  }
},
{
  tableName: 'categoriaingresos',
  timestamps: false,
  freezeTableName: true,
}
);

module.exports = categoriaingresos;
