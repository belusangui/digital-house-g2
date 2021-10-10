

window.addEventListener('load', function (){ 

    //captura variables
    let productosEnCarrito = localStorage.getItem('productosCarrito');
    let arrayCarrito = productosEnCarrito ? JSON.parse(productosEnCarrito) : [];

    let listaCarrito = document.getElementById('lista-productos-carrito');

    let botonFinalizarCompra = document.getElementById('botonFinalizarCompra');


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
            cruz.classList.add('fas', 'fa-times', "boton-cruz");
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

        let newLiCarritoVacio = document.createElement('li');
        newLiCarritoVacio.classList.add('emptyCart', 'titulares-terciarios');
        newLiCarritoVacio.innerText = "Tu carrito esta vacío!"
        listaCarrito.appendChild(newLiCarritoVacio);

    }

    let botonesCruz = document.getElementsByClassName('boton-cruz');
    
    
    for (i = 0; i < botonesCruz.length; i++) {
        
        botonesCruz[i].addEventListener('click', eliminarDeCarrito);

        let nombreObraAEliminar = botonesCruz[i].previousSibling.innerText;

        let liProductoAEliminar = (botonesCruz[i].parentElement).parentElement;

        function eliminarDeCarrito () {
            
            liProductoAEliminar.style.display = "none";

            let carritoActualizado = arrayCarrito.filter(producto => producto.nombre != nombreObraAEliminar);
    
            localStorage.setItem('productosCarrito', JSON.stringify(carritoActualizado));

            let carritoCount = document.getElementById('carrito-count');

            carritoCount.innerText = carritoActualizado.length;

        }
    
    }

    botonFinalizarCompra.addEventListener('click', finalizarCompra);

    function finalizarCompra (e) {
        e.preventDefault();

        localStorage.removeItem('productosCarrito');

        window.location.replace('/galeria');
    }
    

    
});