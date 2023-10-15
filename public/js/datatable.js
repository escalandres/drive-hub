import {ICONS} from "./vars.js";

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
        { "targets": [3,2], "orderable": false },
        { "targets": 3, "className": "", "searchable": false, "visible": false },
    ],
    "order": [[3,'asc'],[0,'asc']],
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
    var elementoParaEliminar = document.getElementById("folderInfo"); // ELiminamos el json que devuelve el servidor
    elementoParaEliminar.remove();
    agregarIcono()
  }

function consultarCarpeta(){
    try{
        var folderInfoDiv = document.getElementById("folderInfo");
        var texto = folderInfoDiv.textContent;
        // Analiza el texto JSON en un objeto JavaScript ->
        var folderObj = JSON.parse(texto);
        construirTabla('fileTable',folderObj)
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
            
            // Agregar la clase 'selected-row' a la fila seleccionada
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

function agregarIcono(){
    var miTabla = $('#fileTable').DataTable();
    miTabla.rows().every(function() {
        var iconClass = buscarIcono(this.data().Extension); // Encuentra la clase de icono según el valor de la columna "Extension"
        var iconElement = `<i class="i-icon ${iconClass}"></i> `; // Elemento <i> con la clase de icono
    
        // Agrega el elemento <i> antes del texto en la primera celda de la fila actual
        var primeraCelda = this.node().getElementsByTagName('td')[0];
        primeraCelda.innerHTML = iconElement + primeraCelda.innerHTML;
    });
}

function buscarIcono(fileExtension){
    if(fileExtension === "") return 'folder-icon'
    // Busca el tipo de archivo en el objeto icons
    const fileType = ICONS[fileExtension];

    // Si se encuentra el tipo de archivo, devuelve su nombre de clase
    if (fileType) {
        return fileType;
    } else {
        // Si no se encuentra, devuelve 'unknown-icon' por defecto
        return 'unknown-icon';
    }
}