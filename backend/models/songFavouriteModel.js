import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const SongFavourite = sequelize.define("SongFavourite", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  song_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});
