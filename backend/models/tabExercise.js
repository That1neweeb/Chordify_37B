import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const TabExercise = sequelize.define("TabExercise",{

    id:{
        type : DataTypes.INTEGER,
         autoIncrement:true,
         allowNull:false,
         primaryKey:true,
    },
    image_URL :{
        type : DataTypes.ARRAY(DataTypes.TEXT),
        allowNull:false, 
    },
    title : {
        type:DataTypes.TEXT,
        allowNull:false
    }

})