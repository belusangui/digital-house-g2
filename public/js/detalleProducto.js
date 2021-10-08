window.addEventListener('load', function (){ 


//captura variables
let botonAgregarCarrito = document.getElementById('boton-agregar-carrito');
let nombreObra = document.getElementById('producto-nombre').innerText;
let artista = document.getElementById('producto-artista').innerText;
let precioObra = document.getElementById('producto-precio').innerText;
let dimensionesObra = document.getElementById('producto-dimensiones').innerText;
let rutaAbsolutaImg = document.getElementById('imagen-producto').src;
let rutaRelativaImg = rutaAbsolutaImg.replace('http://localhost:3000','');
let idProducto = location.pathname.replace('/galeria/detalle_producto/','');


// objeto product a guardar en carrito
let producto = {
    id: idProducto,
    nombre: nombreObra,
    artista: artista,
    precio: precioObra,
    dimensiones: dimensionesObra,
    img: rutaRelativaImg
}

botonAgregarCarrito.addEventListener('click', agregarAlCarrito);

function agregarAlCarrito (e) {

    e.preventDefault();

    let listaCarrito;

    if(localStorage.getItem('productosCarrito')) {
        listaCarrito = JSON.parse(localStorage.getItem('productosCarrito'));
    } else {
        listaCarrito = [];
    }

    listaCarrito.push(producto);

    localStorage.setItem('productosCarrito', JSON.stringify(listaCarrito));

}

})