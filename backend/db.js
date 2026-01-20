import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config()

export const sequelize = new Sequelize(
    "chordify_db", //db name
    "postgres", //db user
    "1234", //db password
    {
        host: "localhost",
        dialect: "postgres"
    }
) 
export const connection = async () => {
    try {

        //alter : true tries to match table with model
        //force : true drop existing tables and create new one

        await sequelize.sync({ alter: true })
        console.log("Database connection successful");
        
    } catch(e) {
        console.log("Database connection error : ", e);
        
    }
};