import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const TabExercise = sequelize.define("Exercise", {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    image: { type: DataTypes.STRING } 
});

export default TabExercise;
