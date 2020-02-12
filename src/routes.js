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
import DeliveryStartController from './app/controllers/DeliveryStartController';
import DeliveryEndController from './app/controllers/DeliveryEndController';
import DeliveriesController from './app/controllers/DeliveriesController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// Admin Routes
routes.post('/admin', AdminController.store);

// Session routes
routes.post('/session', SessionController.store);

// Courier Routes
routes.put('/courier/deliveries', DeliveryStartController.update);
routes.post(
  '/courier/deliveries',
  upload.single('file'),
  DeliveryEndController.update
);
routes.get('/courier/:id/deliveries', DeliveriesController.index);

// Delivery Problems Routes
routes.post('/delivery/:delivery_id/problems', DeliveryProblemController.index);

// Middleware session validator
// routes.use(authMiddleware);

/**
 * Validated Admin routes
 */

// Admin update
routes.put('/admin', AdminController.update);

// Courier Entity Routes
routes.get('/courier', CourierController.index);
routes.post('/courier', CourierController.store);
routes.put('/courier', CourierController.update);
routes.delete('/courier', CourierController.delete);

// Recipient Entity Routes
routes.post('/recipient', RecipientController.store);
routes.get('/recipient', RecipientController.index);
routes.put('/recipient', RecipientController.update);
routes.delete('/recipient', RecipientController.delete);

routes.post('/files', upload.single('file'), FileController.store);

// Delivery Entity Routes
routes.get('/delivery', DeliveryController.index);
routes.post('/delivery', DeliveryController.store);
routes.put('/delivery', DeliveryController.update);
routes.delete('/delivery', DeliveryController.delete);

export default routes;
