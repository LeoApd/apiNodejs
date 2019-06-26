const express = require('express');
const routes = new express.Router();

//import dos controllers
const ProductController = require('../controllers/ProductController');
const UserController = require('../controllers/UserController');

//rotas produto
routes.post('/product/create', ProductController.save)
routes.get('/product/list', ProductController.list);
routes.put('/product/:id/update', ProductController.update);
routes.delete('/product/:id/delete', ProductController.delele);
routes.post('/product/listOne', ProductController.listOne);

//rotas usuário
routes.post('/user/create', UserController.create);

module.exports = routes;//teste teste ultimo teste

