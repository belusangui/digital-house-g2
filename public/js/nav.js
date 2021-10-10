window.addEventListener('load', function (){ 


let carritoCount = document.getElementById('carrito-count');

let productosEnCarrito = localStorage.getItem('productosCarrito');
let arrayCarrito = productosEnCarrito ? JSON.parse(productosEnCarrito) : [];


if(arrayCarrito.length >=1) {
    carritoCount.innerText = arrayCarrito.length;
} 

})