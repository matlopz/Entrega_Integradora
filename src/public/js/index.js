const socket = io();

//  mostrar los productos en la lista
function showProducts(products) {
  const productList = document.getElementById('productList');
  productList.innerHTML = ''; // Limpiar la lista antes de agregar productos
  products.forEach(product => {
    productList.innerHTML += `
      <li>${product.title} - $${product.price}</li>
      <li>${product.description}</li>
      <li>${product.code}</li> 
      <li>${product.status}</li>
      <li>${product.stock}</li>
      <li>${product.category}</li>
      <li>${product.thumbnails}</li>
     
      <br>
    `;
  });

}

// Escuchar el evento para recibir la lista de productos actualizada 
socket.on('updateProducts', (products) => {
  showProducts(products);
});

document.getElementById('addProductForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const productName = document.getElementById('productTitle').value;
  const productPrice = document.getElementById('productPrice').value;
  const productDescription = document.getElementById('productDescription').value;
  const productCode = document.getElementById('productCode').value;
  const productStatus = document.getElementById('productStatus').value;
  const productStock = document.getElementById('productStock').value;
  const productCategory = document.getElementById('productCategory').value;
  const productThumbnails = document.getElementById('productThumbnails').value;

  socket.emit('addProduct', {
    title: productName,
    price: parseFloat(productPrice),
    description: productDescription,
    code: productCode,
    status: productStatus,
    stock: productStock,
    category: productCategory,
    thumbnails: productThumbnails,
  });

  // Limpiar el formulario después de enviar los datos
  document.getElementById('addProductForm').reset();
});

document.getElementById('updateProductBtn').addEventListener('click', () => {
    const productId = document.getElementById('editProductId').value;
    const fieldToEdit = document.getElementById('editField').value;
    const newValue = document.getElementById('editValue').value;

    console.log('ID del producto a actualizar:', productId);
    console.log('Campo a editar:', fieldToEdit);
    console.log('Nuevo valor:', newValue);

    const updatedProduct = {
      [fieldToEdit]: newValue,
    };

    console.log('Producto actualizado:', updatedProduct);

    socket.emit('updateProduct', { productId, updatedProduct });
    document.getElementById('addProductForm').reset();
  });


document.getElementById('deleteProductBtn').addEventListener('click', () => {
  const productId = document.getElementById('editProductId').value;
  socket.emit('deleteProduct', productId);
});
