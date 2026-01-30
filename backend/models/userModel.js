import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Users = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    full_name: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(250),
      allowNull: false,
      unique: true
    },
    password_hash: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: "learner"
    },
    verification_token: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    token_expires: {
      type: DataTypes.DATE,
      allowNull: true
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    reset_token: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  reset_token_expires: {
    type: DataTypes.DATE,
    allowNull: true
  },
    profile_image: {            
      type: DataTypes.STRING,   
      allowNull: true
    },

 }
  
);
