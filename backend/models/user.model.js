import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

 const usermodel= sequelize.define('User', 
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        username:{
            type:DataTypes.STRING(100),
            allowNull:false,
            unique:true
        },
        email:{
            type:DataTypes.STRING(250),
            allowNull:false,
            unique:true
        },
        password:{
            type:DataTypes.STRING(8),
            allowNull:false
        },
        role:{
            type:DataTypes.ENUM('vendedor', 'gerente_compras', 'proovedor', 'transportista', 'control_calidad', 'analista'),
            defaultValue:'analista'
        }
    }, {
        timestamps:true,
        underscored:true
    }
)

export default usermodel