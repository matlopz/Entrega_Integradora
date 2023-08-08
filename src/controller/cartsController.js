const express = require('express');
const router = express.Router();
const cartsService = require('../services/cartsService');
const HTTP_STATUS_CODE = require('../constants/error.constants');

router.get('/', async (req, res) => {
  try {
    const carts = await cartsService.getAllCarts();
    res.status(HTTP_STATUS_CODE.OK).json(carts);
  } catch (err) {
    res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newCart = await cartsService.createCart();
    res.status(HTTP_STATUS_CODE.CREATED).json(newCart);
  } catch (err) {
    res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
});

router.get('/:cid', async (req, res) => {
  try {
    const cid = req.params.cid;
    const cartProducts = await cartsService.getCartProducts(cid);
    if (cartProducts) {
      res.json(cartProducts);
    } else {
      res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ error: 'Cart not found' });
    }
  } catch (err) {
    res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity;
    const addedProduct = await cartsService.addProductToCart(cid, pid, quantity);
    if (!addedProduct) {
      res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ error: 'Cart not found' });
    } else {
      res.json(addedProduct);
    }
  } catch (err) {
    res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
