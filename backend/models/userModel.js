// models/userModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); 

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: 'Customer' },
  status: { type: DataTypes.STRING, defaultValue: 'Active' },
  joined: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'users'
});

// Auto-create table if not exists
(async () => {
  await User.sync({ alter: true });
  console.log('Users table ready (Sequelize)');
})();

module.exports = User;
