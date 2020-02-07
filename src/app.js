/**
 * @description: Includes the configuration of the Express server.
 * @author: Sandro Damasceno <sdamasceno.dev@gmail.com>
 */

import express, { json } from 'express';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  // Use JSON in all Req and Res
  middlewares() {
    this.server.use(json());
  }

  // Use all routes as middlewares on App
  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
