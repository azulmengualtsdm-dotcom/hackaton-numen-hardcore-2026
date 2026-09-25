import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import usermodel from "./user.model.js";
import productsModel from "./products.model.js";

const shipmentModel = sequelize.define('Shipment', {
    id: {
         type: DataTypes.INTEGER, 
         autoIncrement: true,
          primaryKey: true 

    },
    requested_quantity: { 
        type: DataTypes.INTEGER,
         allowNull: false 
    },
    store_branch: { type: DataTypes.STRING(100), 
        allowNull: false 
    },
    state_shipment: { 
        type: DataTypes.ENUM('Solicitado', 'Aprobado', 'Preparado', 'En Camino', 'Aprobado Calidad'),
        defaultValue: 'Solicitado'
    },
    urgency_stock: { 
        type: DataTypes.ENUM('Normal', 'Riesgo Crítico'),
        defaultValue: 'Normal'
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: productsModel, key: 'id' }
    },
    vendedor_id: { 
        type: DataTypes.INTEGER,
         allowNull: false, 
         references: { 
            model: usermodel, 
            key: 'id' } 
        },
    supplier_id: {
        type: DataTypes.INTEGER,
         allowNull: true,
          references: {
             model: usermodel, key: 'id'
             } 
            },
    transportista_id: {
         type: DataTypes.INTEGER,
          allowNull: true,
           references: { 
            model: usermodel, key: 'id'
         }
        },
    calidad_id: {
         type: DataTypes.INTEGER, 
         allowNull: true,
          references: { 
            model: usermodel,
             key: 'id' } 
            }
}, { 
    timestamps: true, 
    underscored: true 
});

export default shipmentModel;
