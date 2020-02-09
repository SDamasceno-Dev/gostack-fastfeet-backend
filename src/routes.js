/**
 * @description: Here is the entire routes structure of the App.
 * @author: Sandro Damasceno <sdamasceno.dev@gmail.com>
 */

import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import AdminController from './app/controllers/AdminController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import CourierController from './app/controllers/CourierController';
import FileController from './app/controllers/FileController';
import DeliveryController from './app/controllers/DeliveryController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// Admin Routes
routes.post('/admin', AdminController.store);

// Session routes
routes.post('/session', SessionController.store);

// Middleware session validator
routes.use(authMiddleware);

// Validated Admin routes
routes.put('/admin', AdminController.update);

routes.post('/courier', CourierController.store);
routes.get('/courier', CourierController.index);
routes.put('/courier', CourierController.update);
routes.delete('/courier', CourierController.delete);

routes.post('/recipient', RecipientController.store);
routes.get('/recipient', RecipientController.index);
routes.put('/recipient', RecipientController.update);
routes.delete('/recipient', RecipientController.delete);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/delivery', DeliveryController.index);
routes.post('/delivery', DeliveryController.store);
routes.put('/delivery', DeliveryController.update);
routes.delete('/delivery', DeliveryController.delete);

export default routes;
