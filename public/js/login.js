window.addEventListener('load', function (){ 

//captura de variables
let form = document.getElementById('login-form');



let sectionPassword = document.getElementById('section-password');
let mensajeError = document.createElement('p');
mensajeError.className = "error-message";
mensajeError.style.display = "none";
sectionPassword.appendChild(mensajeError);


form.addEventListener('submit', validarEmail);

function validarEmail (e){

e.preventDefault();

let email = document.getElementById('login-email');
let password = document.getElementById('login-password');

let atPosition = email.value.indexOf('@');
let dotPosition = email.value.lastIndexOf('.');

if(atPosition < 1 || dotPosition < (atPosition+2) || dotPosition+2 >= email.length ) {

    email.classList.add('is-invalid');
    mensajeError.innerText = "Email invalido";
    mensajeError.style.display = "block";

} else if(password.value.length < 5) {
    
    password.classList.add('is-invalid');
    mensajeError.innerText = "Contraseña invalida";
    mensajeError.style.display = "block";

} else {
    form.submit();
}

}












})


