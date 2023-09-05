
const socket = io();




const showProducts = async () => {
    const productList = document.getElementById('productList');

    productList.innerHTML = ''; // Limpiar la lista antes de agregar productos
    //respuesta 
    const response = await fetch('/productos');

    const producto = await response.json();
    console.log(producto)


    producto.products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
                <br>----------------------------------------</br>
                <strong>ID:</strong> ${product._id}<br>
                <strong>Title:</strong> ${product.title}<br>
                <strong>Precio:</strong> $${product.price}<br>
                <strong>Description:</strong> ${product.description}<br>
                <strong>Code:</strong> ${product.code}<br>
                <strong>Status:</strong> ${product.status}<br>
                <strong>Stock:</strong> ${product.stock}<br>
                <strong>Category:</strong> ${product.category}<br>
                <strong>Thumbnails:</strong> ${product.thumbnails}<br>
                <br>
                <form class="addToCartForm">
                    <button type="submit" data-product="${product._id}">Agregar al Carrito</button><br>
                </form>
            `;
        productList.appendChild(listItem);
    });


    setupAddToCartButtons();


};


showProducts();


// Configurar eventos de los botones Agregar al Carrito
const setupAddToCartButtons = () => {
    const addToCartForms = document.querySelectorAll('.addToCartForm');
    addToCartForms.forEach(addToCartForm => {
        addToCartForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const productId = event.target.querySelector('button').getAttribute('data-product');
            if (productId) {
                const cartId = '64f612f6e363c7b8b2128bf7';
                socket.emit('addToCart', { productId, cartId });
                console.log('Producto ID:', productId);
            } else {
                console.log('Error: No se pudo obtener el ID del producto.');
            }
        });
    });
}

socket.on('connect', () => {
    console.log('Conectado al servidor de sockets');
});

socket.on('updateProducts', (products) => {
    console.log('Productos actualizados:', products);
    showProducts(products);
});

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded escuchado');
});
