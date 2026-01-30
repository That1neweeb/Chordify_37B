import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const Chord = sequelize.define("Chord", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: { 
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Chord;
