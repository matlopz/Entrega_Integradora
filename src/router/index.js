// router/index.js
const express = require('express');
const productsController = require('../controller/productsController');
const cartsController = require('../controller/cartsController');

const router = express.Router();

router.use('/products', productsController);
router.use('/products/realTimeProducts', productsController);
router.use('/carts', cartsController);

module.exports = () => router;
