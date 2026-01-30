import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Products = sequelize.define(
  "Products",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    brand: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    condition: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    rating: {
      type: DataTypes.DECIMAL(3, 1),
      allowNull: true
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    image_urls: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    
    status: { 
      type: DataTypes.ENUM("pending", "approved", "rejected"), 
      defaultValue: "pending",
      allowNull: false
    },

      description: {            
      type: DataTypes.TEXT,
      allowNull: true           
    },
  },

);
