import { showLoading, hideLoading, alerta } from "./general.js";
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const register = document.getElementById('signup-form');
const login = document.getElementById('signin-form');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

// password validation function 
function matchPassword() {  
  var pw1 = document.getElementById("pswd1").value;  
  var pw2 = document.getElementById("pswd2").value;  
  if(pw1 !== pw2)  
  {   
    alerta.error("Passwords did not match");  
    return false;
  } else {  
    return true; 
  }  
}  



login.addEventListener('submit', async (event) => {
  event.preventDefault();
  showLoading();
  const response = await fetch('/user/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          email: login.elements.email.value,
          password: login.elements.password.value
      })
  });
  hideLoading();
  if (!response.ok) {
      // Mostrar un mensaje de error si el inicio de sesión falla
      // alert(data.message);
      alerta.error("El usuario y/o contraseña no es válido")
  }else{
      window.location.href = '/drive/mydrive'
  }
});

register.addEventListener('submit', async (event) => {
  event.preventDefault();
  alert(matchPassword())
  if(matchPassword()){
    showLoading();
    const response = await fetch('/user/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: register.elements.email.value,
            name: register.elements.name.value,
            password: register.elements.password.value
        })
    });
    hideLoading();
    if (!response.ok) {
        alerta.error("Ocurrió un error al registrar su usuario. Inténtelo nuevamente")
    }else{
        window.location.href = '/drive/mydrive'
    }
  }
});

