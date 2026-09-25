import { Router } from 'express';
import { register, login, logout, getProfile } from '../controller/auth.controllers.js';

const authRouter = Router();


authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.get('/profile', (req, res, next) => { req.user = { id: 1 }; next(); }, getProfile);

export default authRouter;
