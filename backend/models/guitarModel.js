const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Guitar = sequelize.define('Guitar', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  brand: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  stock: { type: DataTypes.INTEGER, allowNull: false },
  condition: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING, defaultValue: 'pending' },
  user_id: { type: DataTypes.INTEGER }
}, {
  tableName: 'guitars',
  timestamps: true
});

// Auto-create table if not exists
(async () => {
  try {
    await Guitar.sync({ alter: true }); 
    console.log('Guitars table recreated (Sequelize)');
  } catch (err) {
    console.error('Failed to sync Guitars table:', err);
  }
})();

module.exports = Guitar;