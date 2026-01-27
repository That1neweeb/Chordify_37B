import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Favourite =  sequelize.define("Favourite", {
    id: {
        primaryKey:true,
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true
    },
    user_id: {
        type:DataTypes.INTEGER,
        allowNull:false
    },
    product_id: {
        type:DataTypes.INTEGER,
        allowNull:false
    }
})