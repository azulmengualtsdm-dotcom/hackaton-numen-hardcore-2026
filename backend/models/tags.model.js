import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
export const tagsModel=sequelize.define('tags', {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
     type_urgency:{
        type:DataTypes.STRING(100),
        allowNull:false,
    }
},{
    timestamps:true,
    underscored:true
})