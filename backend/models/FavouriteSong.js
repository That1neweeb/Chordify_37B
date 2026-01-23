import { DataTypes } from "sequelize";
import { sequelize } from "../db";

export const FavouriteSongs = sequelize.define("FavouriteSongs",{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    }
});