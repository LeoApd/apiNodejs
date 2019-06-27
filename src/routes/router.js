const express = require('express');
const auth = require('../middleware/auth');
const ProductController = require('../controllers/ProductController');
const UserController = require('../controllers/UserController');
const BuyProductController = require('../controllers/BuyProductController')

const routes = express.Router();

//rotas produto
routes.post('/product/create', ProductController.save);
routes.get('/product/list', ProductController.list);
routes.put('/product/:id/update', ProductController.update);
routes.delete('/product/:id/delete', ProductController.delele);
routes.post('/product/listOne', ProductController.listOne);

//rotas usuário
routes.post('/user/create', UserController.create);

//rota de autenticação
routes.post('/user/auth', UserController.auth);

//rota de compra
routes.post('/product/:id/buy', auth, BuyProductController.buyItem);
routes.get('/product/myOrder', auth, BuyProductController.myOrder)

module.exports = routes;//teste teste ultimo teste

