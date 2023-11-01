import { showLoading, hideLoading, alerta } from "./general.js";
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

// password validation function 
function matchPassword() {  
  var pw1 = document.getElementById("pswd1");  
  var pw2 = document.getElementById("pswd2");  
  if(pw1 != pw2)  
  {   
    alerta.error("Passwords did not match");  
  } else {  
    alerta.success("Password created successfully");  
  }  
}  

const register = document.getElementById('signup-form');
const login = document.getElementById('signin-form');

login.addEventListener('submit', async (event) => {
    event.preventDefault();
    matchPassword()
    showLoading();
    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: form.elements.email.value,
            password: form.elements.password.value
        })
    });
    hideLoading();
    const data = await response.json();
    if (!data.success) {
        // Mostrar un mensaje de error si el inicio de sesión falla
        // alert(data.message);
        SendAlert("El usuario y/o contraseña no es válido","error")
    }else{
        window.location.href = '/user'
    }
});