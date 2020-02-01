/*
 *  routes.js will struture all routes of the App
 */
import { Router } from 'express';
import AdminController from './app/controllers/AdminController';
import RecipController from './app/controllers/RecipController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/admin', AdminController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.put('/admin', AdminController.update);
routes.post('/recipient', RecipController.store);

export default routes;
