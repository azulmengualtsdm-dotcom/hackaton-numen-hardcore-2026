import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from "cors";
import { startDb } from "./config/database.js";

import usermodel from "./models/user.model.js";
import profileModel from "./models/profile.model.js";
import reporterModel from "./models/reporter.model.js";
import productsModel from "./models/products.model.js";
import shipmentModel from "./models/shipment.model.js";

import authRouter from "./routes/auth.route.js";
import shipmentRouter from "./routes/shipment.route.js";

dotenv.config();

const app = express();
app.use('/api/auth', authRouter);
app.use('/api/shipment', shipmentRouter);

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());


usermodel.hasOne(profileModel, { foreignKey: 'user_id', as: 'profile' });
profileModel.belongsTo(usermodel, { foreignKey: 'user_id', as: 'user' });

usermodel.hasMany(reporterModel, { foreignKey: 'user_id', as: 'reports' });
reporterModel.belongsTo(usermodel, { foreignKey: 'user_id', as: 'author' });

productsModel.hasMany(shipmentModel, { foreignKey: 'product_id', as: 'shipments' });
shipmentModel.belongsTo(productsModel, { foreignKey: 'product_id', as: 'product_details' });
usermodel.hasMany(shipmentModel, { foreignKey: 'vendedor_id', as: 'vendedor_pedidos' });
usermodel.hasMany(shipmentModel, { foreignKey: 'supplier_id', as: 'proveedor_pedidos' });
usermodel.hasMany(shipmentModel, { foreignKey: 'transportista_id', as: 'chofer_rutas' });
usermodel.hasMany(shipmentModel, { foreignKey: 'calidad_id', as: 'auditorias_calidad' });

const port = process.env.PORT || 3005;

app.listen(port, async () => {
    console.log(`🚀 Servidor de la Hackatón corriendo limpio en el puerto ${port}`);
    await startDb();
});
