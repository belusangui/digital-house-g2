window.addEventListener('load', function (){ 

    let productosEnCarrito = localStorage.getItem('productosCarrito');
    let arrayCarrito = productosEnCarrito ? JSON.parse(productosEnCarrito) : [];


    let listaCarrito = document.getElementById('lista-productos-carrito');

    if (arrayCarrito.length >= 1) {

        arrayCarrito.forEach(function(producto){

            let newLi = document.createElement('li');
            newLi.classList.add("productoCarrito");

            let contenedorImg = document.createElement('div');
            contenedorImg.classList.add('contenedor-img-carrito');

            let imgProducto = document.createElement('img');
            imgProducto.classList.add('imagen-carrito-producto');
            imgProducto.src = producto.img;
            contenedorImg.appendChild(imgProducto);

            let contenedorDetalles = document.createElement('div');
            contenedorDetalles.classList.add('detalles-producto-carrito');

            let nombreObra = document.createElement('p');
            nombreObra.classList.add('nombreObra', 'parrafos');
            nombreObra.innerText = producto.nombre;

            let cruz = document.createElement('i');
            cruz.classList.add('fas', 'fa-times');
            cruz.id = "boton-cruz";

            let nombreArtista = document.createElement('p');
            nombreArtista.classList.add('nombreArtista', 'parrafos');
            nombreArtista.innerText = producto.artista;

            let precio = document.createElement('p');
            precio.classList.add('precioObra', 'parrafos');
            precio.innerText = producto.precio;

            contenedorDetalles.appendChild(nombreObra);
            contenedorDetalles.appendChild(cruz);
            contenedorDetalles.appendChild(nombreArtista);
            contenedorDetalles.appendChild(precio);


            newLi.appendChild(contenedorImg);
            newLi.appendChild(contenedorDetalles);

            listaCarrito.appendChild(newLi);

        })
 
    } else {
        alert('Your cart is empty')
    }

    
});