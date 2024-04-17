const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');

const CategoriaAhorro = sequelize.define('CategoriaAhorro', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombreCategoria: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'categoriaahorro',
  timestamps: false,
  freezeTableName: true
});

module.exports = CategoriaAhorro;
