const showCarts = async () => {
    const cartsList = document.getElementById('cartsList');
    cartsList.innerHTML = '';
    const cartId = '64f612f6e363c7b8b2128bf7'
    try {
        const response = await fetch(`/views/carritos/${cartId}`);
        console.log(response);        
        const cart = await response.json();
        console.log('hola',cart);
        cart.products.forEach(product => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <br>----------------------------------------</br>
                <strong>ID:</strong> ${product.product._id}<br>
                <strong>Título:</strong> ${product.product.title}<br>
                <strong>Precio:</strong> $${product.product.price}<br>
                <strong>Cantidad:</strong> ${product.quantity}<br>
            `;
            cartsList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
    }
}

showCarts();
