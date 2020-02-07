/**
 * @description: Here is the entire routes structure of the App.
 * @author: Sandro Damasceno <sdamasceno.dev@gmail.com>
 */

import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import AdminController from './app/controllers/AdminController';
import SessionController from './app/controllers/SessionController';
import RecipController from './app/controllers/RecipController';
import CourierController from './app/controllers/CourierController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// Admin Routes
routes.post('/admin', AdminController.store);

// Session routes
routes.post('/sessions', SessionController.store);

// Middleware session validator
routes.use(authMiddleware);

// Validated Admin routes
routes.put('/admin', AdminController.update);
routes.put('/courier', CourierController.update);
routes.post('/recipient', RecipController.store);
routes.put('/recipient', RecipController.update);
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
