import { showLoading, hideLoading, alerta } from "./general.js";
const logout = document.getElementById('logout-btn')
// Dropzone.options.fileDropzone = { // camelized version of the `id`
//     paramName: "file", // The name that will be used to transfer the file
//     maxFilesize: 2, // MB
//     uploadMultiple: true,
//     previewsContainer: true,
//     accept: function(file, done) {
//       if (file.name == "justinbieber.jpg") {
//         done("Naha, you don't.");
//       }
//       else { done(); }
//     }
// };


logout.addEventListener('click', async (event) => {
  event.preventDefault();
  showLoading();
  const response = await fetch('/user/logout', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
  });
  hideLoading();
  if (!response.ok) {
      alerta.error("Error al cerrar sesión. Inténtelo nuevamente")
  }else{
      window.location.href = '/'
  }
});
