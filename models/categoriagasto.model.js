const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');

const categoriagasto = sequelize.define('categoriagasto', {
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
  tableName: 'categoriagasto',
  timestamps: false,
  freezeTableName: true,
}
);

module.exports = categoriagasto;
