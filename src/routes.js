/*
 *  routes.js will struture all routes of the App
 */
import { Router } from 'express';
import UserController from './app/controllers/UserController';

const routes = new Router();

routes.post('/users', UserController.store);

export default routes;
