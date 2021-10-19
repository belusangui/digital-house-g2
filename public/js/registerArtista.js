window.addEventListener('load', function(){

let form = document.getElementById('register-form');


let sectionNombre = document.getElementById('section-fullname-art');

let sectionUsername = document.getElementById('section-username');

let sectionAddressArtist = document.getElementById('section-address-art');

let sectionEmailArt = document.getElementById('section-email-art');

let sectionPass = document.getElementById('section-pass-art');

let sectionPass2 = document.getElementById('section-pass2-art');

let sectionBirth = document.getElementById('section-birth-art');

let sectionAvatar = document.getElementById('section-avatar-art');



let mensajeErrorName = document.createElement('p');
mensajeErrorName.className = "error-message";
mensajeErrorName.style.display = "none";

let mensajeErrorUsername = document.createElement('p');
mensajeErrorUsername.className = "error-message";
mensajeErrorUsername.style.display = "none";

let mensajeErrorAddress = document.createElement('p');
mensajeErrorAddress.className = "error-message";
mensajeErrorAddress.style.display = "none";

let mensajeErrorMail = document.createElement('p');
mensajeErrorMail.className = "error-message";
mensajeErrorMail.style.display = "none";

let mensajeErrorPassw = document.createElement('p');
mensajeErrorPassw.className = "error-message";
mensajeErrorPassw.style.display = "none";

let mensajeErrorPassw2 = document.createElement('p');
mensajeErrorPassw2.className = "error-message";
mensajeErrorPassw2.style.display = "none";

let mensajeErrorBirth = document.createElement('p');
mensajeErrorBirth.className = "error-message";
mensajeErrorBirth.style.display = "none";

let mensajeErrorAvatar = document.createElement('p');
mensajeErrorAvatar.className = "error-message";
mensajeErrorAvatar.style.display = "none";


let name = document.getElementById('artist-fullname')

name.addEventListener('change', validarName);
form.addEventListener('submit', validarName);

function validarName (e){
   
    if(name.value.length < 4){

        sectionNombre.appendChild(mensajeErrorName);
        name.classList.add('is-invalid');
        mensajeErrorName.innerText = "Completar con un nombre valido";
        mensajeErrorName.style.display = "block";
    }else{
        mensajeErrorName.style.display = "none";
        name.classList.remove('is-invalid');
    }
}


let username = document.getElementById('artist-username');

username.addEventListener('change', validarUsername);
form.addEventListener('submit', validarUsername);

function validarUsername (e){

    if(username.value.length < 3 || username.value.includes(' ')){
        sectionUsername.appendChild(mensajeErrorUsername);
        username.classList.add('is-invalid');
        mensajeErrorUsername.innerText = "Completar con un nombre de usuario valido";
        mensajeErrorUsername.style.display = "block";
    }else{
        mensajeErrorUsername.style.display = "none";
        username.classList.remove('is-invalid');
    }
}


let address = document.getElementById('artist-address');

address.addEventListener('change', validarAddress);
form.addEventListener('submit', validarAddress);

function validarAddress (e){

    if(address.value.length < 5){
      sectionAddressArtist.appendChild(mensajeErrorAddress);
      address.classList.add('is-invalid');
      mensajeErrorAddress.innerText = "Completar con una direccion valida";
      mensajeErrorAddress.style.display = 'block';
    }else{
        mensajeErrorAddress.style.display = 'none';
        address.classList.remove('is-invalid');
    }
}


let email = document.getElementById('artist-email');

email.addEventListener('change', validarEmailArt);
form.addEventListener('submit', validarEmailArt);

function validarEmailArt(e){
    
    let atPosition = email.value.indexOf('@');
    let dotPosition = email.value.lastIndexOf('.');
    

    if(atPosition < 1 || dotPosition < (atPosition+2) || dotPosition+2 >= email.value.length ) {

        sectionEmailArt.appendChild(mensajeErrorMail);
        email.classList.add('is-invalid');
        mensajeErrorMail.innerText = "Email invalido";
        mensajeErrorMail.style.display = "block";
    
    }else{
        mensajeErrorMail.style.display = "none";
        email.classList.remove('is-invalid');
    }
}


let pass = document.getElementById('artist-password');

pass.addEventListener('keypress', validarPassword);
form.addEventListener('submit', validarPassword);

function validarPassword (e){
    
    if(pass.value.length < 5){

        sectionPass.appendChild(mensajeErrorPassw);
        pass.classList.add('is-invalid');
        mensajeErrorPassw.innerText = "Contraseña invalida";
        mensajeErrorPassw.style.display = "block";
    
    }else{
        mensajeErrorPassw.style.display = "none";
        pass.classList.remove('is-invalid');
    }
}


let pass2 = document.getElementById('artist-password2');

pass2.addEventListener('change', validarPassword2);
form.addEventListener('submit', validarPassword2);

function validarPassword2 (e){

    if (pass.value != pass2.value){

        sectionPass2.appendChild(mensajeErrorPassw2);
        pass2.classList.add('is-invalid');
        mensajeErrorPassw2.innerText = "Las contraseñas no coinciden";
        mensajeErrorPassw2.style.display = "block";
     }else{
        mensajeErrorPassw2.style.display = "none";
        pass2.classList.remove('is-invalid');
     }
}


let birth = document.getElementById('artist-birthday');

birth.addEventListener('blur', validarBirth);
form.addEventListener('submit', validarBirth);

function validarBirth (e){

    if(birth.value <= 0000-00-00){
        e.preventDefault();
           sectionBirth.appendChild(mensajeErrorBirth);
           birth.classList.add('is-invalid');
           mensajeErrorBirth.innerText = "Completar con una fecha valida";
           mensajeErrorBirth.style.display = "block";
       
       }else{
           mensajeErrorBirth.style.display = "none";
           birth.classList.remove('is-invalid');
       }
}


let avatar = document.getElementById('artist-avatar');

avatar.addEventListener('change', validarAvatar);
form.addEventListener('submit', validarAvatar);

function validarAvatar(e){

    if(!avatar.value){
        e.preventDefault();
        sectionAvatar.appendChild(mensajeErrorAvatar);
        mensajeErrorAvatar.innerText = "Incluir una foto de perfil";
        mensajeErrorAvatar.style.display = "block";
    }else{
        mensajeErrorAvatar.style.display = "none";
    }
}

})