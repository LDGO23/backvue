const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
},
{
  tableName: 'usuarios',
  timestamps: false,
  freezeTableName: true,
}
);

module.exports = Usuario;
