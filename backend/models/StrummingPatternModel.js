import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const StrummingPattern = sequelize.define("StrummingPattern", {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false }, // e.g., "DD UU DD UU"
    image: { type: DataTypes.STRING } // optional
});

export default StrummingPattern;
