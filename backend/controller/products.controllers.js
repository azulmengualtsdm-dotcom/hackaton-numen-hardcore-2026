import shipmentModel from '../models/shipment.model.js';
import productsModel from '../models/products.model.js';


export const createRequest = async (req, res) => {
    try {
        const { product_id, requested_quantity, store_branch, urgency_stock } = req.body;

        
        const productExists = await productsModel.findByPk(product_id);
        if (!productExists) 
            return res.status(404).json({ error: 'El producto solicitado no existe.' });

        const newShipment = await shipmentModel.create({
            product_id,
            requested_quantity,
            store_branch,
            urgency_stock, 
            vendedor_id: req.user.id, 
            state_shipment: 'Solicitado' 
        });

        return res.status(201).json(newShipment);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const approveByGerente = async (req, res) => {
    try {
        const { id } = req.params; 
        const { supplier_id } = req.body; 

        const shipment = await shipmentModel.findByPk(id);
        if (!shipment) return res.status(404).json({ error: 'El remito de envío no existe.' });

        await shipmentModel.update(
            { supplier_id, state_shipment: 'Aprobado' }, 
            { where: { id } }
        );

        return res.status(200).json({ message: 'Pedido autorizado por la gerencia y asignado al proveedor.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const prepareBySupplier = async (req, res) => {
    try {
        const { id } = req.params;

        const shipment = await shipmentModel.findByPk(id);
        if (!shipment) return res.status(404).json({ error: 'El remito de envío no existe.' });

        await shipmentModel.update(
            { state_shipment: 'Preparado' }, 
            { where: { id } }
        );

        return res.status(200).json({ message: 'El proveedor confirma que la mercadería está lista y embalada.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


export const shipByDriver = async (req, res) => {
    try {
        const { id } = req.params;

        const shipment = await shipmentModel.findByPk(id);
        if (!shipment) return res.status(404).json({ error: 'El remito de envío no existe.' });

        await shipmentModel.update(
            { transportista_id: req.user.id, state_shipment: 'En Camino' }, 
            { where: { id } }
        );

        return res.status(200).json({ message: 'El transportista retiró la carga. Camión en ruta.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const verifyByQuality = async (req, res) => {
    try {
        const { id } = req.params;

        const shipment = await shipmentModel.findByPk(id);
        if (!shipment) return res.status(404).json({ error: 'El remito de envío no existe.' });

        await shipmentModel.update(
            { calidad_id: req.user.id, state_shipment: 'Aprobado Calidad' }, 
            { where: { id } }
        );

        return res.status(200).json({ message: 'Control de calidad aprobado. Circuito logístico completado.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


export const getShipmentTrace = async (req, res) => {
    try {
        const { id } = req.params;
        
        const shipment = await shipmentModel.findByPk(id, {
            
            include: { model: productsModel, as: 'product_details', attributes: ['name_material', 'description'] } 
        });

        if (!shipment) return res.status(404).json({ error: 'Envío no encontrado.' });

        return res.status(200).json(shipment);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
