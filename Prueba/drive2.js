const ICONS = {
    "default": "unknown-icon",
    "folder": "folder-icon",

    ".jpg": "img-icon",
    ".jpeg": "img-icon",
    ".png": "img-icon",
    ".gif": "gif-icon",
    ".bmp": "img-icon",
    ".tiff": "img-icon",
    ".svg": "svg-icon",
    ".webp": "img-icon",

    ".mp3": "audio-icon",
    ".m4a": "audio-icon",
    ".wav": "audio-icon",
    ".flac": "audio-icon",

    ".mp4": "video-icon",
    ".avi": "video-icon",
    ".mov": "video-icon",
    ".mkv": "video-icon",

    ".js": "js-icon",
    ".json": "code-icon",
    ".css": "css-icon",
    ".html": "html-icon",
    ".php": "code-icon",
    ".py": "code-icon",
    ".java": "code-icon",
    ".cpp": "code-icon",
    ".cs": "code-icon",
    ".rb": "code-icon",
    ".pl": "code-icon",
    ".sh": "code-icon",
    ".sql": "sql-icon",
    ".c": "code-icon",
    ".scss": "code-icon",

    ".doc": "word-icon",
    ".docx": "word-icon",
    ".pdf": "pdf-icon",
    ".postscript": "svg-icon",
    ".rtf": "word-icon",
    ".xls": "excel-icon",
    ".xlsx": "excel-icon",
    ".ppt": "ppt-icon",
    ".pptx": "ppt-icon",
    ".7z": "compressed-icon",
    ".tar": "compressed-icon",
    ".xz": "compressed-icon",
    ".zip": "compressed-icon",
    ".rar": "compressed-icon",
    ".xml": "xml-icon",
    ".txt": "txt-icon",
    ".ttf": "font-icon",
    ".otf": "font-icon",
    ".woff": "font-icon",
    ".woff2": "font-icon",

    ".rtf": "word-icon",

    ".accdb": "database-icon",
    ".apk": "apk-icon",
    ".app": "unknown-icon",
    ".asp": "code-icon",
    ".aspx": "code-icon",
    ".bat": "terminal-icon",
    ".bz2": "compressed-icon",

    ".cab": "compressed-icon",
    ".cfm": "code-icon",
    ".clj": "code-icon",
    ".cc": "code-icon",
    ".cgi": "terminal-icon",
    ".db": "database-icon",
    ".dbf": "database-icon",
    ".deb": "compressed-icon",
    ".dll": "gear-icon",
    ".dmg": "drive-icon",
    ".erb": "code-icon",
    ".exe": "exe-icon",
    ".fnt": "font-icon",
    ".gam": "controller-icon",
    ".gz": "compressed-icon",
    ".h": "code-icon",
    ".ini": "gear-icon",
    ".iso": "cd-icon",
    ".jar": "compressed-icon",
    ".jsp": "code-icon",
    ".lua": "code-icon",
    ".lz": "compressed-icon",
    ".lzma": "compressed-icon",
    ".m": "code-icon",
    ".map": "map-icon",
    ".msi": "compressed-icon",
    ".otf": "font-icon",
    ".pdb": "database-icon",
    ".php": "code-icon",
    ".pl": "code-icon",
    ".pkg": "compressed-icon",
    ".psd": "img-icon",
    ".py": "code-icon",
    ".rb": "code-icon",
    ".rm": "video-icon",
    ".rom": "controller-icon",
    ".rpm": "compressed-icon",
    ".sass": "code-icon",
    ".sav": "controller-icon",

    ".srt": "txt-icon",
    ".tbz2": "compressed-icon",
    ".tgz": "compressed-icon",
    ".tlz": "compressed-icon",
    ".vb": "code-icon",
    ".vbs": "code-icon",
    ".xcf": "img-icon",
    ".yaws": "code-icon"
}

$(document).ready(function() {
    consultarCarpeta();
});


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

function consultarCarpeta(){
    try{
        var folderInfoDiv = document.getElementById("folderInfo");
        var texto = folderInfoDiv.textContent;
        // Analiza el texto JSON en un objeto JavaScript ->
        console.log(texto)
        var folderObj = JSON.parse(texto);
        construirTabla(folderObj)
    }
    catch(err){
        console.error(err)
        alert('ocurrió un error')
    }
    
}

// var table = document.getElementById("fileTable")

function construirTabla(folderData) {
    // Obtener la referencia a la tabla por su ID
    
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

// function construirTabla(folderData) {
//     // Obtener una referencia a la tabla por su ID
//     var table = document.getElementById('fileTable');
//     var tbody = table.getElementsByTagName('tbody')[0];
  
//     // Limpiar la tabla antes de agregar nuevos datos (opcional)
//     tbody.innerHTML = '';
  
//     // Iterar a través de la lista de archivos y agregar cada archivo a la tabla
//     for (var i = 0; i < folderData.Archivos.length; i++) {
//       var archivo = folderData.Archivos[i];
  
//       // Crear una nueva fila y celdas para cada archivo
//       var newRow = tbody.insertRow();
//       var cellName = newRow.insertCell(0);
//       var cellModificationDate = newRow.insertCell(1);
//       var cellSize = newRow.insertCell(2);
//       var cellExtension = newRow.insertCell(3);
  
//       // Asignar los valores a las celdas
//       cellName.textContent = archivo.Name;
//       cellModificationDate.textContent = archivo.ModificationDate;
//       cellSize.textContent = archivo.Size;
//       cellExtension.textContent = archivo.Extension;
//     }
//     agregarEventosRow()
//     var elementoParaEliminar = document.getElementById("folderInfo"); // ELiminamos el json que devuelve el servidor
//     elementoParaEliminar.remove();
//     agregarIcono()
//     // eliminarYReinsertarUL()
//   }

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

function agregarIcono(){
    // var miTabla = $('#fileTable').DataTable();
    table.rows().every(function() {
        var iconClass = buscarIcono(this.data().Extension); // Encuentra la clase de icono según el valor de la columna "Extension"
        var iconElement = `<i class="i-icon ${iconClass}"></i> `; // Elemento <i> con la clase de icono
    
        // Agrega el elemento <i> antes del texto en la primera celda de la fila actual
        var primeraCelda = this.node().getElementsByTagName('td')[0];
        primeraCelda.innerHTML = iconElement + primeraCelda.innerHTML;
    });
}

// function agregarIcono(){
//     var rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

//     for (var i = 0; i < rows.length; i++) {
//       var row = rows[i];
//       var iconClass = buscarIcono(row.cells[3].textContent); // Encuentra la clase de icono según el valor de la columna "Extension"
//       var iconHtml = '<i class="i-icon ' + iconClass + '"></i> ';
//       row.cells[0].innerHTML = iconHtml + row.cells[0].innerHTML;
//     }
// }

function eliminarYReinsertarUL() {
    // Obtener una referencia al elemento <ul> que deseas eliminar
    var ulElement = document.getElementById('miUL'); // Reemplaza 'miUL' con el ID de tu elemento <ul>
  
    // Obtener el padre del elemento <ul> para poder reinsertarlo en el mismo lugar
    var parentElement = ulElement.parentNode;
  
    // Clonar el elemento <ul> para conservar su contenido
    var clonedUL = ulElement.cloneNode(true);
  
    // Eliminar el elemento <ul> original
    parentElement.removeChild(ulElement);
  
    // Volver a insertar el elemento clonado en su lugar
    parentElement.appendChild(clonedUL);
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