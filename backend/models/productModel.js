// models/productModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../dbSequalize');

const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  stock: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'pending' },
  user_id: { type: DataTypes.INTEGER },
  sold: { type: DataTypes.INTEGER, defaultValue: 0 }
}, {
  tableName: 'products'
});

// Auto-create table if not exists
(async () => {
  try {
    await Product.sync({ alter: true }); // This will create the table if not exists or update schema
    console.log('Products table ready (Sequelize)');
  } catch (err) {
    console.error('Failed to sync Products table:', err);
  }
})();

module.exports = Product;
