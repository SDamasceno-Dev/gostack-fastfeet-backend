/* 
 *  app.js will include the App Structure
 */
const express = require('express');
const routes = require('./routes');
class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {  // List all Middlewares used in App
    this.server.use(express.json()); // Use JSON in all Req and Res
  }

  routes() {  // List all routes used on App
    this.server.use(routes) // Routes as middlewares
  }
}

module.exports = new App().server;
