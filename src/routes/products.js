const express = require('express');
const routes = new express.Router();

const ProductController = require('../controllers/ProductController');

routes.post('/product/create', ProductController.save);

module.exports = routes;//teste

