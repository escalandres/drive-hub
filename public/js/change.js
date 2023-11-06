import { showLoading, hideLoading, alerta } from "./general.js";
document.getElementById('passEye').addEventListener('click', () => {
    var pass = document.getElementById("password");
    if (pass.type === "password") {
      pass.type = "text";
      document.getElementById("eye").style.display = 'none';
      document.getElementById("eyeSlash").style.display = '';
    } else {
      pass.type = "password";
      document.getElementById("eye").style.display = '';
      document.getElementById("eyeSlash").style.display = 'none';
    }
  });
  
  const form = document.getElementById('change-form');
  
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    showLoading();
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: form.elements.password.value
      })
    });
    hideLoading();
    const data = await response.json();
    if (!data.success) {
      // Mostrar un mensaje de error si el inicio de sesión falla
      // alert(data.message);
      alerta.error("El usuario y/o contraseña no es válido")
    } else {
      window.location.href = `/check-otp/${form.elements.email.value}`
    }
  });