const { Server } = require('socket.io');
const productsService = require('./services/productsService');

const initializeIO = (httpServer) => {
  const io = new Server(httpServer);

  io.on('connection', async (socket) => {
    console.log(`Usuario conectado: ${socket.id}`);

    try {
      // Enviar la lista de productos cuando esta conectado.
      const products = await productsService.getAllProducts();
      io.to(socket.id).emit('updateProducts', products);
    } catch (err) {
      console.error('Error al obtener la lista de productos:', err);
    }

    socket.on('addProduct', async (product) => {
      try {
        const addedProduct = await productsService.addProduct(product);
        io.emit('updateProducts', await productsService.getAllProducts());
        console.log('Nuevo producto:', addedProduct);
      } catch (err) {
        console.error('Error al agregar el producto:', err);
      }
    });

    socket.on('updateProduct', async ({ productId, updatedProduct }) => {
      try {
        const updatedProductResult = await productsService.updateProduct(productId, updatedProduct);
        if (updatedProductResult) {
          io.emit('updateProducts', await productsService.getAllProducts());
          console.log('Producto actualizado:', updatedProductResult);
        } else {
          console.log('Producto no encontrado');
        }
      } catch (err) {
        console.error('Error al actualizar el producto:', err);
      }
    });

    socket.on('deleteProduct', async (productId) => {
      try {
        await productsService.deleteProduct(productId);
        io.emit('updateProducts', await productsService.getAllProducts());
        console.log('Producto eliminado:', productId);
      } catch (err) {
        console.error('Error al eliminar el producto:', err);
      }
    });

  });
};

module.exports = initializeIO;
