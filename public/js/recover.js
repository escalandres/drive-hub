const form = document.getElementById("recover-form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    showLoading();
    const response = await fetch('/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: form.elements.email.value,
        })
    });
    hideLoading();
    if (!response.ok) {
        // alerta.error("El usuario y/o contraseña no es válido")
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            showConfirmButton: true
        })
    }else{
        Swal.fire({
            icon: 'success',
            title: 'Recupera tu cuenta',
            text: 'El código de verificación ha sido enviado a su correo electrónico',
            showConfirmButton: true,
        })
    }
});