$(document).ready(function() {
    consultarCarpeta();
});

class Archivo {
    constructor() {
        this.Name = '';
        this.ModificationDate = '';
        this.Extension = '';
        this.Size = '';
    }
}

class Folder {
    constructor(path, name) {
        this.Path = path;
        this.Name = name;
        this.Archivos = []; // Inicializamos la lista de archivos como un array vacío
    }

    // Método para agregar un archivo a la lista de archivos
    agregarArchivo(archivo) {
        this.Archivos.push(archivo);
    }
}

var table = $('#fileTable').DataTable({
    "ordering": true,
    "order": [[0, "asc"]],
    //"order": [[0, "folder-first"]],
    "searching": true,
    "lengthChange": false,
    "language": {
        "search": "Buscar:",
        "searchPlaceholder": "Buscar en la tabla",
        emptyTable: "No se encontraron archivos",
        info: "",
        infoFiltered: "",
        infoEmpty: "",
    },
    "paging": false, // Deshabilitar la paginación de DataTables
    "columns": [
        { "width": "70%", "data": "Name" },
        { "width": "20%", "data": "ModificationDate" },
        { "width": "10%", "data": "Size" },
        { "width": "1%", "data": "Extension" },
    ],
    "columnDefs": [
        { "targets": 0, "className": "text-left" },
        { "targets": [1,2], "className": "text-center", "searchable": false },
        { "targets": 3, "className": "", "searchable": false, "visible": false },
        // {
        //     "targets": 0, // La columna que deseas ordenar de manera personalizada
        //     "type": 'folder-first' // Usa el tipo de ordenamiento personalizado 'folder-first'
        // }
    ]
});

function construirTabla(tableId, folderData) {
    // Obtener la referencia a la tabla por su ID
    var table = $('#' + tableId).DataTable();
    
    // Limpiar la tabla antes de agregar nuevos datos (opcional)
    table.clear().draw();
  
    // Iterar a través de la lista de archivos y agregar cada archivo a la tabla
    for (var i = 0; i < folderData.Archivos.length; i++) {
      var archivo = folderData.Archivos[i];
      // Crear un objeto que coincida con la estructura de las columnas definidas en DataTables
      var rowData = {
        "Name": archivo.Name,
        "ModificationDate": archivo.ModificationDate,
        "Size": archivo.Size,
        "Extension": archivo.Extension
      };
      // Agregar la fila utilizando el objeto creado
      table.row.add(rowData);
    }
  
    // Dibujar la tabla para que los datos se muestren
    table.draw();

    agregarEventosRow()
    var elementoParaEliminar = document.getElementById("folderInfo"); // Reemplaza "miElemento" con el ID de tu elemento
    elementoParaEliminar.remove();
  }

// function consultarCarpeta(){
//     // Crear los datos que deseas enviar en el cuerpo de la solicitud POST
//     const datos = {
//         clave1: 'valor1'
//     };
//     // Realizar la solicitud POST
//     fetch('/drive/mydrive', {
//         method: 'POST',
//         headers: {
//         'Content-Type': 'application/json' // Establecer el tipo de contenido del cuerpo de la solicitud
//         },
//         body: JSON.stringify(datos) // Convertir los datos a formato JSON y establecerlos como cuerpo de la solicitud
//     })
//     .then(response => {
//         // Manejar la respuesta de la solicitud
//         if (response.ok) {
//             return response.json(); // Si la respuesta es exitosa, convertir la respuesta a JSON
//         } else {
//             throw new Error('Error en la solicitud POST');
//         }
//     })
//     .then(data => {
//       // Manejar los datos de la respuesta
//         console.log('Respuesta del servidor:', data);
//         construirTabla('fileTable',data)
        
//     })
//     .catch(error => {
//       // Manejar errores de la solicitud
//         console.error('Error:', error);
//     });
// }

function consultarCarpeta(){
    try{
        var folderInfoDiv = document.getElementById("folderInfo");
        var texto = folderInfoDiv.textContent;
        console.log(texto)
        // Analiza el texto JSON en un objeto JavaScript
        var folderObj = JSON.parse(texto);
        console.log(folderObj)
        construirTabla('fileTable',folderObj)
        // Verifica que tengas un objeto de la clase Folder
        // if (folderObj instanceof Folder) {
        //     // Itera a través de la lista de archivos dentro del objeto Folder
        //     folderObj.Archivos.forEach(function(archivo) {
        //         // Si deseas convertir los objetos Archivo a instancias de la clase Archivo, puedes hacerlo aquí
        //         var archivoObj = new Archivo();
        //         archivoObj.Name = archivo.Name;
        //         archivoObj.ModificationDate = archivo.ModificationDate;
        //         archivoObj.Extension = archivo.Extension;
        //         archivoObj.Size = archivo.Size;
            
        //         // Ahora, archivoObj contiene un objeto de la clase Archivo
        //         console.log(archivoObj);
        //     });
        //     construirTabla('fileTabla',folderObj)
        // }
    }
    catch(err){
        console.error(err)
        alert('ocurrió un error')
    }
    
}

function agregarEventosRow(){
    var tbody = document.querySelector("tbody"); // Selecciona el tbody en lugar de todas las filas
    var rows = tbody.querySelectorAll("tr"); // Selecciona solo las filas dentro del tbody
    
    rows.forEach(function(row) {
        row.addEventListener("click", function() {
            // Remover la clase 'selected-row' de todas las filas
            rows.forEach(function(row) {
                row.classList.remove("selected-row");
            });
            
            // Agregar la clase 'selected-row' a la fila clicada
            this.classList.add("selected-row");
        });
    });
}

// Manejo del doble clic en DataTables
$('#fileTable tbody').on('dblclick', 'tr', function () {
    var visorPDF = document.getElementById("visorPDF");
    var data = $('#fileTable').DataTable().row(this).data();
    var selected = data["Name"]; // Obtener el contenido de la primera columna
    var currentURL = window.location.href;
    var _url = currentURL + selected;
    // alert(data["Extension"])
    if(esPdfOImagen(data["Extension"])){
        visorPDF.src = _url;
        // Mostrar el modal si no está visible
        $("#div_visor").modal("show");
    }
    else{
        location.href = _url
    }
});

function esPdfOImagen(extension) {
    // Convertir la extensión a minúsculas para hacer la comparación insensible a mayúsculas y minúsculas
    extension = extension.toLowerCase();
    
    // Lista de extensiones de archivos de imagen válidas
    var extensionesImagen = [".jpg", ".jpeg", ".png", ".gif", ".txt", ".c"];
  
    // Comprobar si la extensión es un PDF o una extensión de imagen
    if (extension === ".pdf" || extensionesImagen.includes(extension)) {
      return true;
    } else {
      return false;
    }
}

$('#div_visor').on('hidden.bs.modal', function (event) {
    visorPDF.src = "";
});