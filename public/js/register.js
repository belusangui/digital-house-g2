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



form.addEventListener('submit', validarRegistro);


function validarRegistro(e){

e.preventDefault();

let email = document.getElementById('register-email');
let password = document.getElementById('register-password');
let password2 = document.getElementById('register-password2');
let nombre = document.getElementById('register-fullname');
let direccion = document.getElementById('register-address');
let nacimiento = document.getElementById('register-birthday');

let atPosition = email.value.indexOf('@');
let dotPosition = email.value.lastIndexOf('.');


if(nombre.value.length < 4){

    sectionName.appendChild(mensajeError);
    nombre.classList.add('is-invalid');
    mensajeError.innerText = "Completar con un nombre valido";
    mensajeError.style.display = "block";

}else if(direccion.value.length < 4){

    sectionAddress.appendChild(mensajeError);
    direccion.classList.add('is-invalid');
    mensajeError.innerText = "Completar con una direccion valida";
    mensajeError.style.display = "block";

}else if(atPosition < 1 || dotPosition < (atPosition+2) || dotPosition+2 >= email.length ) {

    sectionEmail.appendChild(mensajeError);
    email.classList.add('is-invalid');
    mensajeError.innerText = "Email invalido";
    mensajeError.style.display = "block";

}else if(password.value.length < 5){

    passwordInput.appendChild(mensajeError);
    password.classList.add('is-invalid');
    mensajeError.innerText = "Contraseña invalida";
    mensajeError.style.display = "block";

}else if (password.value != password2.value){

    passwordCheckInput.appendChild(mensajeError);
    password2.classList.add('is-invalid');
    mensajeError.innerText = "Las contraseñas no coinciden";
    mensajeError.style.display = "block";

}else if(nacimiento.value == 0000-00-00){

    sectionBirthday.appendChild(mensajeError);
    nacimiento.classList.add('is-invalid');
    mensajeError.innerText = "Completar con una fecha valida";
    mensajeError.style.display = "block";

}else{
    form.submit();
}
}


let email = document.getElementById('register-email');

email.addEventListener('change', validarEmail);

function validarEmail(e){

    let atPosition = email.value.indexOf('@');
    let dotPosition = email.value.lastIndexOf('.');
    

    if(atPosition < 1 || dotPosition < (atPosition+2) || dotPosition+2 >= email.length ) {

        sectionEmail.appendChild(mensajeError);
        email.classList.add('is-invalid');
        mensajeError.innerText = "Email invalido";
        mensajeError.style.display = "block";
    
    }else{
        mensajeError.style.display = "none";
        email.classList.remove('is-invalid');
    }
}


let password = document.getElementById('register-password');

password.addEventListener('keypress', validarPass);

function validarPass(e){

    if(password.value.length < 5){

        passwordInput.appendChild(mensajeError);
        password.classList.add('is-invalid');
        mensajeError.innerText = "Contraseña invalida";
        mensajeError.style.display = "block";
    
    }else{
        mensajeError.style.display = "none";
        password.classList.remove('is-invalid');
    }
}


let password2 = document.getElementById('register-password2');

password2.addEventListener('blur', checkPass);

function checkPass(e){

    if (password.value != password2.value){

        passwordCheckInput.appendChild(mensajeError);
        password2.classList.add('is-invalid');
        mensajeError.innerText = "Las contraseñas no coinciden";
        mensajeError.style.display = "block";
     }else{
        mensajeError.style.display = "none";
        password2.classList.remove('is-invalid');
     }
    }


let nombre = document.getElementById('register-fullname');

nombre.addEventListener('change', validarNombre);

function validarNombre(e){

        if(nombre.value.length < 4){

            sectionName.appendChild(mensajeError);
            nombre.classList.add('is-invalid');
            mensajeError.innerText = "Completar con un nombre valido";
            mensajeError.style.display = "block";
        }else{
            mensajeError.style.display = "none";
            nombre.classList.remove('is-invalid');
        }
    }


let direccion = document.getElementById('register-address');

direccion.addEventListener('change', validarDireccion);

function validarDireccion(e){

    if(direccion.value.length < 4){

        sectionAddress.appendChild(mensajeError);
        direccion.classList.add('is-invalid');
        mensajeError.innerText = "Completar con una direccion valida";
        mensajeError.style.display = "block";
    
    }else{
        mensajeError.style.display = "none";
        direccion.classList.remove('is-invalid');
    }

    }


let nacimiento = document.getElementById('register-birthday');

nacimiento.addEventListener('change', validarFecha);

function validarFecha(e){

    if(nacimiento.value == 0000-00-00){

        sectionBirthday.appendChild(mensajeError);
        nacimiento.classList.add('is-invalid');
        mensajeError.innerText = "Completar con una fecha valida";
        mensajeError.style.display = "block";
    
    }else{
        mensajeError.style.display = "none";
        nacimiento.classList.remove('is-invalid');
    }
}

})