/**
 * @description: Configuration of the Express server.
 * @author: Sandro Damasceno <sdamasceno.dev@gmail.com>
 */

import express from 'express';
import path from 'path';
import cors from 'cors';
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
    this.server.use(cors()); // Define addresses allowed to use this api
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  // Use all routes as middlewares on App
  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
