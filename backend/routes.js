const { Router } = require('express');
const routes = Router();
const UserController = require('./src/controllers/UserController');

routes.post('/', UserController.store);
routes.get('/users', UserController.index);
routes.put('/edit_user/:id', UserController.update);
routes.delete('/delete_user/:id', UserController.destroy);
routes.get('/show_user/:id', UserController.showUser);

module.exports = routes;