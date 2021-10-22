window.addEventListener('load', function (){ 

//captura de variables
let form = document.getElementById('crear-producto-form');

let section_nombre_obra = document.getElementById('sectionNombreObra');
let section_fecha_creacion = document.getElementById('sectionFechaCreacion');
let section_descripcion_obra = document.getElementById('sectionDescripcionObra');
let section_otros_detalles = document.getElementById('sectionOtrosDetalles');

let mensajeErrorNombre = document.createElement('p');
mensajeErrorNombre.className = "error-message";
mensajeErrorNombre.style.display = "none";

let mensajeErrorAnio = document.createElement('p');
mensajeErrorAnio.className = "error-message";
mensajeErrorAnio.style.display = "none";

let mensajeErrorDescripcion = document.createElement('p');
mensajeErrorDescripcion.className = "error-message";
mensajeErrorDescripcion.style.display = "none";

let mensajeErrorOtrosDetalles = document.createElement('p');
mensajeErrorOtrosDetalles.className = "error-message";
mensajeErrorOtrosDetalles.style.display = "none";


let nombre_obra = document.getElementById('nombreObra');

nombre_obra.addEventListener('keydown', validarNombreObra);



function validarNombreObra(e){
    
    if(nombre_obra.value.length < 4){
        
        section_nombre_obra.appendChild(mensajeErrorNombre);
        nombre_obra.classList.add('is-invalid');
        mensajeErrorNombre.innerText = "El nombre debe tener al menos tres caracteres";
        mensajeErrorNombre.style.display = "block";
    
    }else{
        mensajeErrorNombre.style.display = "none";
        nombre_obra.classList.remove('is-invalid');
    }
}

let fecha_creacion = document.getElementById('fechaDeCreacion');

fecha_creacion.addEventListener('change', validarFechaCreacion);

    
function validarFechaCreacion(e){

        let anio = parseInt(fecha_creacion.value);

        if( (isNaN(anio)) || anio <= 1200 || anio >= 9999){
            
            section_fecha_creacion.appendChild(mensajeErrorAnio);
            fecha_creacion.classList.add('is-invalid');
            mensajeErrorAnio.innerText = "Debe ingresar cuatro dígitos para el año de creación de la obra (sólo números).";
            mensajeErrorAnio.style.display = "block";

        
        }else{
            mensajeErrorAnio.style.display = "none";
            fecha_creacion.classList.remove('is-invalid');
        }

}

let descripcion_obra = document.getElementById('descripcionObra');

descripcion_obra.addEventListener('keydown', validarDescripcionObra);



function validarDescripcionObra(e){

    if(descripcion_obra.value.length < 16){
        
        section_descripcion_obra.appendChild(mensajeErrorDescripcion);
        descripcion_obra.classList.add('is-invalid');
        mensajeErrorDescripcion.innerText = "La descripción debe tener al menos 15 caracteres";
        mensajeErrorDescripcion.style.display = "block";
    
    }else{
        mensajeErrorDescripcion.style.display = "none";
        descripcion_obra.classList.remove('is-invalid');
    }
}

let otros_detalles = document.getElementById('otrosDetallesObra');

otros_detalles.addEventListener('keydown', validarOtrosDetalles);


function validarOtrosDetalles(e){

    if(otros_detalles.value.length < 10){
       
        section_otros_detalles.appendChild(mensajeErrorOtrosDetalles);
        otros_detalles.classList.add('is-invalid');
        mensajeErrorOtrosDetalles.innerText = "Los otros detalles deben tener al menos 10 caracteres";
        mensajeErrorOtrosDetalles.style.display = "block";
    
    }else{
        mensajeErrorOtrosDetalles.style.display = "none";
        otros_detalles.classList.remove('is-invalid');
    }
}

})
    











