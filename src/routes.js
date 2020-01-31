/* 
 *  routes.js will struture all routes of the App
 */
const { Router } = require('express');
const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Tudo ok!' });
});

module.exports = routes;