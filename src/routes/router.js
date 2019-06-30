const express = require('express');

const auth = require('../middleware/auth');

const ProductController = require('../controllers/ProductController');
const UserController = require('../controllers/UserController');
const BuyProductController = require('../controllers/BuyProductController');
const ShoppingCart = require('../controllers/ShoppingCartController');

const routes = express.Router();

//rotas produto
routes.post('/product/create', auth, ProductController.save);
routes.get('/product/list', auth, ProductController.list);
routes.put('/product/:id/update', auth, ProductController.update);
routes.delete('/product/:id/delete', auth, ProductController.delele);
routes.post('/product/listOne', auth, ProductController.listOne);

//rotas usuário
routes.post('/user/create', UserController.newUser);
routes.get('/user/delete', auth, UserController.deleteUser);
routes.put('/user/update', auth, UserController.updateUser)

//rota de autenticação
routes.post('/user/auth', UserController.auth);
routes.post('/user/forgotPassword', UserController.forgotPassword);
routes.post('/user/resetPassword', UserController.resetPassword);

//rota de compra
routes.post('/product/:id/buy', auth, BuyProductController.buyItem);
routes.get('/product/myOrder', auth, BuyProductController.myOrder);
routes.get('/product/:id/cancel', auth, BuyProductController.cancelOrder);

//rota carrinho
routes.get('/cart/:id/add', auth, ShoppingCart.addCart);
routes.delete('/cart/:id/remove', auth, ShoppingCart.removeCart);

module.exports = routes;//teste teste ultimo teste

