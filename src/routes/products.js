const express = require('express');
const routes = new express.Router();

const ProductController = require('../controllers/ProductController');

routes.post('/product/create', ProductController.save)
routes.get('/product/list', ProductController.list);
routes.put('/product/:id/update', ProductController.update);
routes.delete('/product/:id/delete', ProductController.delele);
routes.post('/product/listOne', ProductController.listOne);

module.exports = routes;//teste teste ultimo teste

