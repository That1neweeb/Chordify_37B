import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  total_amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },

  address: {
  type: DataTypes.STRING,
  allowNull: false
  },
  
  phone: {
  type: DataTypes.STRING,
  allowNull: false
  },

  status: {
    type: DataTypes.ENUM(
      "PENDING",
      "PAID",
      "SHIPPED",
      "DELIVERED",
      "CANCELLED"
    ),
    defaultValue: "PENDING"
  }

}, {
  timestamps: true
});
