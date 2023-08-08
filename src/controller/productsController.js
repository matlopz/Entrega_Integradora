const express = require('express');
const io = require('../io');
const router = express.Router();
const productsService = require('../services/productsService');
const HTTP_STATUS_CODE = require('../constants/error.constants');

router.get('/', async (req, res) => {
  try {
    const products = await productsService.getAllProducts();
    console.log(products); 
    res.render('products', { products });
  } catch (err) {
    res.status(HTTP_STATUS_CODE.SERVER).json({ err });
  }
});

router.get('/realTimeProducts', async (req, res) => {
  try {
    const products = await productsService.getAllProducts();
    res.render('realTimeProducts', { products });
  } catch (err) {
    res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
});


router.get('/:pid', async (req, res) => {
  try {
    const pid = req.params.pid;
    const product = await productsService.getProductById(pid);
    if (product) {
      res.status(HTTP_STATUS_CODE.OK).json(product);
    } else {
      res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ error: 'Product not found' });
    }
  } catch (err) {
    res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
});

router.post('/realTimeProducts', async (req, res) => {
  try {
    const newProduct = req.body;
    const addedProduct = await productsService.addProduct(newProduct);
    io.emit('addProduct', addedProduct);
    const products = await productsService.getAllProducts();
    res.render('realTimeProducts', { products });
    console.log('Nuevo producto:', addedProduct);
  } catch (err) {
    res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
});

router.put('/realTimeProducts/:pid', async (req, res) => {
  try {
    const pid = req.params.pid;
    const updatedProduct = req.body;
    const updatedProductResult = await productsService.updateProduct(pid, updatedProduct);
    console.log('Resultado de la actualización:', updatedProductResult); 
    // Verificar si el producto se actualizó correctamente
    if (updatedProductResult) {
      io.emit('productUpdated', updatedProductResult);
      res.status(HTTP_STATUS_CODE.OK).json(updatedProductResult);
    } else {
      res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ error: 'Product not found' });
    }
  } catch (err) {
    res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
});

router.delete('/realTimeProducts/:pid', async (req, res) => {
  try {
    const pid = req.params.pid;
    await productsService.deleteProduct(pid);
    io.emit('deleteProduct', pid);
    res.status(HTTP_STATUS_CODE.OK).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
