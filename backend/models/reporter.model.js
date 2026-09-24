import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import usermodel from "./user.model.js";

const reportermodel= sequelize.define('Reporter', {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    title:{
        type:DataTypes.STRING(100),
        allowNull:false
    },
    description:{
        type:DataTypes.STRING(250),
        allowNull:false
    },
    tipo_documento:{
        type:DataTypes.ENUM('financiero', 'operativo', 'estrategico', 'legal', 'otro'),
        allowNull:false
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:usermodel,
            key:'id'
        }
    }
})

export default reportermodel