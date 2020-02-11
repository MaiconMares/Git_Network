const { Router } = require('express');
const routes = Router();
const UserController = require('./src/controllers/UserController');

routes.get('/', UserController.store);
routes.get('/users', UserController.index);

module.exports = routes;