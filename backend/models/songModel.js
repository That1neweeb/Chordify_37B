import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Songs = sequelize.define(
  "Songs",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    artist: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    strummingPattern: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    difficulty: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        isIn: [["easy", "medium", "hard"]]  
      }
    },
    cover_image: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    content: {
      type: DataTypes.JSONB,
      allowNull: true
    }
  }
);
