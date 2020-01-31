/*
 *  routes.js will struture all routes of the App
 */
import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Tudo ok!!' }));

export default routes;
