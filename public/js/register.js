window.addEventListener('load', function (){

let form = document.getElementById('register-form');


let sectionEmail = document.getElementById('section-email');

let passwordInput = document.getElementById('section-password-register');

let passwordCheckInput = document.getElementById('section-password-register2');

let sectionName = document.getElementById('section-fullname');

let sectionAddress = document.getElementById('section-address');

let sectionBirthday = document.getElementById('section-birthday');


let mensajeError = document.createElement('p');
mensajeError.className = "error-message";
mensajeError.style.display = "none";

let mensajeErrorEmail = document.createElement('p');
mensajeErrorEmail.className = "error-message";
mensajeErrorEmail.style.display = "none";

let mensajeErrorPass = document.createElement('p');
mensajeErrorPass.className = "error-message";
mensajeErrorPass.style.display = "none";

let mensajeErrorCheck = document.createElement('p');
mensajeErrorCheck.className = "error-message";
mensajeErrorCheck.style.display = "none";

let mensajeErrorNombre = document.createElement('p');
mensajeErrorNombre.className = "error-message";
mensajeErrorNombre.style.display = "none";

let mensajeErrorDireccion = document.createElement('p');
mensajeErrorDireccion.className = "error-message";
mensajeErrorDireccion.style.display = "none";

let mensajeErrorFecha = document.createElement('p');
mensajeErrorFecha.className = "error-message";
mensajeErrorFecha.style.display = "none";



let email = document.getElementById('register-email');

email.addEventListener('change', validarEmail);
form.addEventListener('submit', validarEmail)

function validarEmail(e){

    let atPosition = email.value.indexOf('@');
    let dotPosition = email.value.lastIndexOf('.');
    

    if(atPosition < 1 || dotPosition < (atPosition+2) || dotPosition+2 >= email.length ) {

        sectionEmail.appendChild(mensajeErrorEmail);
        email.classList.add('is-invalid');
        mensajeErrorEmail.innerText = "Email invalido";
        mensajeErrorEmail.style.display = "block";
    
    }else{
        mensajeErrorEmail.style.display = "none";
        email.classList.remove('is-invalid');
    }
}


let password = document.getElementById('register-password');

password.addEventListener('keypress', validarPass);
form.addEventListener('submit', validarPass)

function validarPass(e){

    if(password.value.length < 5){

        passwordInput.appendChild(mensajeErrorPass);
        password.classList.add('is-invalid');
        mensajeErrorPass.innerText = "Contraseña invalida";
        mensajeErrorPass.style.display = "block";
    
    }else{
        mensajeErrorPass.style.display = "none";
        password.classList.remove('is-invalid');
    }
}


let password2 = document.getElementById('register-password2');

password2.addEventListener('blur', checkPass);
form.addEventListener('submit', checkPass)

function checkPass(e){

    if (password.value != password2.value){

        passwordCheckInput.appendChild(mensajeErrorCheck);
        password2.classList.add('is-invalid');
        mensajeErrorCheck.innerText = "Las contraseñas no coinciden";
        mensajeErrorCheck.style.display = "block";
     }else{
        mensajeErrorCheck.style.display = "none";
        password2.classList.remove('is-invalid');
     }
    }


let nombre = document.getElementById('register-fullname');

nombre.addEventListener('change', validarNombre);
form.addEventListener('submit', validarNombre)

function validarNombre(e){

        if(nombre.value.length < 4){

            sectionName.appendChild(mensajeErrorNombre);
            nombre.classList.add('is-invalid');
            mensajeErrorNombre.innerText = "Completar con un nombre valido";
            mensajeErrorNombre.style.display = "block";
        }else{
            mensajeErrorNombre.style.display = "none";
            nombre.classList.remove('is-invalid');
        }
    }


let direccion = document.getElementById('register-address');

direccion.addEventListener('change', validarDireccion);
form.addEventListener('submit', validarDireccion)

function validarDireccion(e){

    if(direccion.value.length < 4){

        sectionAddress.appendChild(mensajeErrorDireccion);
        direccion.classList.add('is-invalid');
        mensajeErrorDireccion.innerText = "Completar con una direccion valida";
        mensajeErrorDireccion.style.display = "block";
    
    }else{
        mensajeErrorDireccion.style.display = "none";
        direccion.classList.remove('is-invalid');
    }

    }


let nacimiento = document.getElementById('register-birthday');

nacimiento.addEventListener('change', validarFecha)
form.addEventListener('submit', validarFecha);

function validarFecha(e){

    if(nacimiento.value == 0000-00-00){
     e.preventDefault();
        sectionBirthday.appendChild(mensajeErrorFecha);
        nacimiento.classList.add('is-invalid');
        mensajeErrorFecha.innerText = "Completar con una fecha valida";
        mensajeErrorFecha.style.display = "block";
    
    }else{
        mensajeErrorFecha.style.display = "none";
        nacimiento.classList.remove('is-invalid');
    }
}

})