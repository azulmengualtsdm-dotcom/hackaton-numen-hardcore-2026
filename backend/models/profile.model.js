import Datatypes from "sequelize"
import sequelize from "../config/database.js"
import usermodel from "./user.model.js"

const profileModel=sequelize.define('Profile', {
    id:{
        type:Datatypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    first_name:{
        type:Datatypes.STRING(100),
        allowNull:false
    },
    last_name:{
        type:Datatypes.STRING(100),
        allowNull:false
    }
})

export default profileModel