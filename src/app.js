/*
 *  app.js will include the App Structure
 */
import express, { json } from 'express';
import routes from './routes';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    // List all Middlewares used in App
    this.server.use(json()); // Use JSON in all Req and Res
  }

  routes() {
    // List all routes used on App
    this.server.use(routes); // Routes as middlewares
  }
}

export default new App().server;
