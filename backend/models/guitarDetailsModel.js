import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const GuitarDetails = sequelize.define("GuitarDetails", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },

  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false
  },

  type: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
});
