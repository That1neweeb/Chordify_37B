import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Rating = sequelize.define("Rating", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },

    rating_point: {
        type: DataTypes.INTEGER,
        allowNull:false,
        validate: {
            min: 1,
            max: 5
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull:false
    },


})