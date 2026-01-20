import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Chords = sequelize.define("Chords",{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name:{
        type: DataTypes.STRING(20),
        allowNull: false
    },
    image:{
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: true
    }
})