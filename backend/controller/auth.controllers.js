import usermodel from '../models/user.model.js';
import profileModel from '../models/profile.model.js';
import { hashPassword, comparePassword } from '../helpers/bcrypt.helpers.js';
import { generateToken } from '../helpers/jwt.helpers.js';

export const register = async (req, res) => {
    try {
        const { username, email, password, role, first_name, last_name } = req.body;

        const emailExist = await usermodel.findOne({ where: { email } });
        if (emailExist) return res.status(400).json({ error: 'El correo corporativo ya existe.' });

        const encryptedPassword = await hashPassword(password);

    
        const newUser = await usermodel.create({
            username,
            email,
            password: encryptedPassword,
            role
        });

        await profileModel.create({
            first_name,
            last_name,
            user_id: newUser.id
        });

        return res.status(201).json({ message: 'Personal registrado con éxito.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await usermodel.findOne({ where: { email } });
        if (!user) return res.status(400).json({ error: 'Credenciales inválidas.' });

        const isValidPassword = await comparePassword(password, user.password);
        if (!isValidPassword) return res.status(400).json({ error: 'Credenciales inválidas.' });

        const token = generateToken({ id: user.id, role: user.role });

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,  
            maxAge: 24 * 60 * 60 * 1000 
        });
        return res.status(200).json({ message: 'Inicio de sesión exitoso.', role: user.role });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


export const logout = async (req, res) => {
    res.clearCookie('token');
    
    return res.status(200).json({ message: 'Sesión cerrada con éxito.' });
};


export const getProfile = async (req, res) => {
    try {
        const user = await usermodel.findByPk(req.user.id, {
            attributes: ['id', 'username', 'email', 'role'],
            include: { model: profileModel, as: 'profile', attributes: ['first_name', 'last_name'] }
        });
        return res.status(200).json(user); 
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

