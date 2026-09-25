import { Router } from 'express';
import { 
    createRequest, 
    approveByGerente, 
    prepareBySupplier, 
    shipByDriver, 
    verifyByQuality, 
    getShipmentTrace 
} from '../controller/products.controllers.js';

const shipmentRouter = Router();
const mockAuth = (req, res, next) => { req.user = { id: 1 }; next(); };
shipmentRouter.post('/create', mockAuth, createRequest);
shipmentRouter.put('/approve/:id', mockAuth, approveByGerente);
shipmentRouter.put('/prepare/:id', mockAuth, prepareBySupplier);
shipmentRouter.put('/ship/:id', mockAuth, shipByDriver);
shipmentRouter.put('/verify/:id', mockAuth, verifyByQuality);
shipmentRouter.get('/trace/:id', mockAuth, getShipmentTrace);

export default shipmentRouter;
