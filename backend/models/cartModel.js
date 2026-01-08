import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Cart = sequelize.define("Cart", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull:false
    }
})

