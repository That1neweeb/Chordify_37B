import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const CartItem = sequelize.define('CartItem', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    cart_id: {
    type: DataTypes.INTEGER,
    allowNull: false
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
})