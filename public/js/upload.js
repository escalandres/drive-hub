import { showLoading, hideLoading, alerta, reloadPage } from "./general.js";

const dropZone = document.getElementById('drop-zone');

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.style.border = '2px dashed #666';
});

dropZone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    dropZone.style.border = '2px dashed #ccc';
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.style.border = '2px dashed #ccc';
    const files = e.dataTransfer.files;
    handleFiles(files);
});

dropZone.addEventListener('click', () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.multiple = true;
    fileInput.addEventListener('change', (e) => {
    const files = e.target.files;
        uploadFiles(files);
    });
    fileInput.click();
});

async function uploadFiles(files){
    alert('t')
    showLoading();
    let path = new URL(window.location.href);
    let destPath = path.pathname.replace(/^\/drive\/mydrive\//, '');
    const formData = new FormData();
    formData.append('destPath',destPath)
    for (const file of files) {
        formData.append('files', file);
    }
    console.log(formData)
    const response = await fetch('/upload/file', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: formData
    });
    const data = await response.json();
    hideLoading();
    if (response.status){ alerta.success("Los archivos se subieron correctamente"); reloadPage();}
    else alerta.error("Ocurrió un error al subir los archivos");
}
