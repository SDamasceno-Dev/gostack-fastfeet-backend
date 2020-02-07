/**
 * @description: Here is the entire routes structure of the App.
 * @author: Sandro Damasceno <sdamasceno.dev@gmail.com>
 */

import { Router } from 'express';
import AdminController from './app/controllers/AdminController';
import RecipController from './app/controllers/RecipController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// Admin Routes
routes.post('/admin', AdminController.store);

// Session routes
routes.post('/sessions', SessionController.store);

// Recipient routes
routes.post('/recipient', RecipController.store);

// Middleware session validator
routes.use(authMiddleware);

// Validated Admin routes
routes.put('/admin', AdminController.update);
routes.put('/recipient', RecipController.update);

export default routes;
