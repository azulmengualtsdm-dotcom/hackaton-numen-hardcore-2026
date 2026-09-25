import reporterModel from '../models/reporter.model.js';
import usermodel from '../models/user.model.js';

export const createReport = async (req, res) => {
    try {
        const { title, description, tipo_documento } = req.body;
        
        const newReport = await reporterModel.create({
            title,
            description,
            tipo_documento,
            user_id: req.user.id 
        });
        
        res.status(201).json(newReport);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getAllReports = async (req, res) => {
    try {
        const reports = await reporterModel.findAll({
            order: [['created_at', 'DESC']], 
            include: { model: usermodel, as: 'author', attributes: ['username'] } 
        });
        res.json(reports);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
