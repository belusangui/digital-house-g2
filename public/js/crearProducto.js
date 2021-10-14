window.addEventListener('load', function (){ 

//captura de variables
let form = document.getElementById('crear-producto-form');

let section_nombre_obra = document.getElementById('sectionNombreObra');
let section_nombre_artista = document.getElementById('sectionNombreArtista');
let section_fecha_creacion = document.getElementById('sectionFechaCreacion');
//let section_ancho = document.getElementById('sectionAncho');
//let section_alto = document.getElementById('sectionAlto');
let section_descripcion_obra = document.getElementById('sectionDescripcionObra');
let section_otros_detalles = document.getElementById('sectionOtrosDetalles');
//let section_precio_obra = document.getElementById('sectionPrecioObra');

let mensajeError = document.createElement('p');
mensajeError.className = "error-message";
mensajeError.style.display = "none";



let nombre_obra = document.getElementById('nombreObra');

nombre_obra.addEventListener('keydown', validarNombreObra);

function validarNombreObra(e){

    if(nombre_obra.value.length < 3){

        section_nombre_obra.appendChild(mensajeError);
        nombre_obra.classList.add('is-invalid');
        mensajeError.innerText = "El nombre debe tener al menos tres caracteres";
        mensajeError.style.display = "block";
    
    }else{
        mensajeError.style.display = "none";
        nombre_obra.classList.remove('is-invalid');
    }
}


    let nombre_artista = document.getElementById('nombreArtista');

    nombre_artista.addEventListener('keydown', validarNombreArtista);
    
    function validarNombreArtista(e){
    
        if(nombre_artista.value.length < 3){
    
            section_nombre_artista.appendChild(mensajeError);
            nombre_artista.classList.add('is-invalid');
            mensajeError.innerText = "Debe ingresar un nombre con un mínimo de tres caracteres";
            mensajeError.style.display = "block";
        
        }else{
            mensajeError.style.display = "none";
            nombre_artista.classList.remove('is-invalid');
        }

    }

    let fecha_creacion = document.getElementById('fechaDeCreacion');

    fecha_creacion.addEventListener('keydown', validarFechaCreacion);
    
    function validarFechaCreacion(e){
    
        if(fecha_creacion.value.length != 3 && (fecha_creacion.value != 0 || fecha_creacion.value != 1 || fecha_creacion.value != 2 || fecha_creacion.value != 3 || fecha_creacion.value != 4 || fecha_creacion.value != 5 || fecha_creacion.value != 6 || fecha_creacion.value != 7 || fecha_creacion.value != 8 || fecha_creacion.value != 9) ){
    
            section_fecha_creacion.appendChild(mensajeError);
            fecha_creacion.classList.add('is-invalid');
            mensajeError.innerText = "Debe ingresar cuatro dígitos para el año de creación de la obra (sólo números).";
            mensajeError.style.display = "block";
        
        }else{
            mensajeError.style.display = "none";
            fecha_creacion.classList.remove('is-invalid');
        }

    }
let descripcion_obra = document.getElementById('descripcionObra');

descripcion_obra.addEventListener('keydown', validarDescripcionObra);

function validarDescripcionObra(e){

    if(descripcion_obra.value.length < 16){

        section_descripcion_obra.appendChild(mensajeError);
        descripcion_obra.classList.add('is-invalid');
        mensajeError.innerText = "La descripción debe tener al menos 15 caracteres";
        mensajeError.style.display = "block";
    
    }else{
        mensajeError.style.display = "none";
        descripcion_obra.classList.remove('is-invalid');
    }
}

let otros_detalles = document.getElementById('otrosDetallesObra');

otros_detalles.addEventListener('keydown', validarOtrosDetalles);

function validarOtrosDetalles(e){

    if(otros_detalles.value.length < 10){

        section_otros_detalles.appendChild(mensajeError);
        otros_detalles.classList.add('is-invalid');
        mensajeError.innerText = "Los otros detalles deben tener al menos 10 caracteres";
        mensajeError.style.display = "block";
    
    }else{
        mensajeError.style.display = "none";
        otros_detalles.classList.remove('is-invalid');
    }
}

    form.addEventListener('submit', validarCreacionProducto);


    function validarCreacionProducto(e){

    let nombre_obra = document.getElementById('nombreObra');
    let nombre_artista = document.getElementById('nombreArtista');
    let fecha_creacion = document.getElementById('fechaDeCreacion');
    let descripcion_obra = document.getElementById('descripcionObra');
    let otros_detalles = document.getElementById('otrosDetallesObra');

  
        e.preventDefault();
        if(nombre_obra.value.length < 3){

            section_nombre_obra.appendChild(mensajeError);
            nombre_obra.classList.add('is-invalid');
            mensajeError.innerText = "El nombre debe tener al menos tres caracteres";
            mensajeError.style.display = "block";
        
        }else if(nombre_artista.value.length < 3){
    
            section_nombre_artista.appendChild(mensajeError);
            nombre_artista.classList.add('is-invalid');
            mensajeError.innerText = "Debe ingresar un nombre con un mínimo de tres caracteres";
            mensajeError.style.display = "block";
        }else if (fecha_creacion.value.length < 3){
    
            section_fecha_creacion.appendChild(mensajeError);
            fecha_creacion.classList.add('is-invalid');
            mensajeError.innerText = "Debe ingresar cuatro dígitos para el año de creación de la obra (sólo números).";
            mensajeError.style.display = "block";
            
        }else if (descripcion_obra.value.length < 16){

            section_descripcion_obra.appendChild(mensajeError);
            descripcion_obra.classList.add('is-invalid');
            mensajeError.innerText = "La descripción debe tener al menos 15 caracteres";
            mensajeError.style.display = "block";
        
        }else if(otros_detalles.value.length < 10){

            section_otros_detalles.appendChild(mensajeError);
            otros_detalles.classList.add('is-invalid');
            mensajeError.innerText = "Los otros detalles deben tener al menos 10 caracteres";
            mensajeError.style.display = "block";
        
        }else{
            form.submit();
        }
        
    
    }
})
    











