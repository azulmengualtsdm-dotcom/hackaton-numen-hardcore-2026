import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import usermodel from "./user.model.js";

 const productsModel= sequelize.define('Products', {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name_material:{
        type:DataTypes.STRING(100),
        allowNull:false
    },
    requested_quantity:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    description: { 
        type: DataTypes.STRING(250),
        allowNull: true
    },
    urgency_stock: {
        type: DataTypes.ENUM('Normal', 'Riesgo Crítico'),
        defaultValue: 'Normal'
    },
    supplier_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: usermodel,
            key: 'id'
        }

}},
{
    timestamps:true,
    underscored:true
})

export default productsModel

