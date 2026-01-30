import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Posts = sequelize.define(
    "Posts",
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            allowNull:false
        },

        title:{
            type: DataTypes.STRING(30),
            allowNull:false
        },

        description:{
            type: DataTypes.STRING(100),
            allowNull: false
        },
        uploadedBy:{
            type:DataTypes.STRING(20),
            allowNull:false
        },
        video_URLS:{
            type: DataTypes.STRING,
            allowNull:false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        approval_status:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull:false
        }

    }
)