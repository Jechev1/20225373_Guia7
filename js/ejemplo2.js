//  REFERENCIAS
const frm = document.forms["frmRegistro"];
const modal = new bootstrap.Modal(document.getElementById("idModal"));
const modalBody = document.getElementById("idBodyModal");

//  FUNCIÓN PRINCIPAL DE VALIDACIÓN

function validarFormulario() {
    let errores = [];
    let valido = true;

    const nombre = document.getElementById("idNombre").value.trim();
    const apellidos = document.getElementById("idApellidos").value.trim();
    const fechaNac = document.getElementById("idFechaNac").value;
    const correo = document.getElementById("idCorreo").value.trim();
    const pass1 = document.getElementById("idPassword").value;
    const pass2 = document.getElementById("idPasswordRepetir").value;

    const pais = document.getElementById("idCmPais").value;

    const intereses = [
        document.getElementById("idCkProgramacion"),
        document.getElementById("idCkBD"),
        document.getElementById("idCkRedes"),
        document.getElementById("idCkSeguridad")
    ];

    const carreras = document.getElementsByName("idRdCarrera");

    //  VALIDACIONES
    // Campos vacíos
    if (nombre === "") { errores.push("El campo Nombres no puede estar vacío"); valido = false; }
    if (apellidos === "") { errores.push("El campo Apellidos no puede estar vacío"); valido = false; }
    if (fechaNac === "") { errores.push("Debe seleccionar una fecha de nacimiento"); valido = false; }
    if (correo === "") { errores.push("Debe ingresar un correo electrónico"); valido = false; }
    if (pass1 === "" || pass2 === "") { errores.push("Debe completar ambos campos de contraseña"); valido = false; }

    // Fecha no mayor a hoy
    if (fechaNac !== "" && new Date(fechaNac) > new Date()) {
        errores.push("La fecha de nacimiento no puede ser mayor que hoy");
        valido = false;
    }

    // Regex de email
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (correo !== "" && !regexEmail.test(correo)) {
        errores.push("El correo electrónico no es válido");
        valido = false;
    }

    // Contraseñas iguales
    if (pass1 !== "" && pass2 !== "" && pass1 !== pass2) {
        errores.push("Las contraseñas no coinciden");
        valido = false;
    }

    // Intereses (mínimo 1)
    if (!intereses.some(i => i.checked)) {
        errores.push("Debe seleccionar al menos un interés");
        valido = false;
    }

    // Carrera seleccionada (radio button)
let carreraSeleccionada = null;

for (let c of carreras) {
    if (c.checked) {

        // encontrar el label de manera segura
        let label = c.parentElement.querySelector("label");
        carreraSeleccionada = label ? label.textContent.trim() : "(sin texto)";
        break;
    }
}


    // País seleccionado
    if (pais === "Seleccione una opcion") {
        errores.push("Debe seleccionar un país de origen");
        valido = false;
    }

    // Si hay errores → mostrar alert
    if (!valido) {
        alert(" Errores encontrados:\n\n" + errores.join("\n"));
        return;
    }

    // Si todo está correcto → mostrar modal
    mostrarDatosEnModal({
        nombre,
        apellidos,
        fechaNac,
        correo,
        carrera: carreraSeleccionada,
        pais: document.getElementById("idCmPais").options[document.getElementById("idCmPais").selectedIndex].text,
        intereses: intereses.filter(i => i.checked).map(i => i.nextSibling.textContent.trim())
    });
}


//  CREAR TABLA CON DOM (SIN innerHTML)

function crearFila(tabla, titulo, dato) {
    const tr = document.createElement("tr");

    const th = document.createElement("th");
    th.textContent = titulo;

    const td = document.createElement("td");
    td.textContent = dato;

    tr.appendChild(th);
    tr.appendChild(td);

    tabla.appendChild(tr);
}

//  MOSTRAR INFO EN MODAL
function mostrarDatosEnModal(info) {

    // Limpiar contenido anterior
    while (modalBody.firstChild) {
        modalBody.removeChild(modalBody.firstChild);
    }

    const tabla = document.createElement("table");
    tabla.className = "table table-bordered";

    crearFila(tabla, "Nombre", info.nombre);
    crearFila(tabla, "Apellido", info.apellidos);
    crearFila(tabla, "Fecha de nacimiento", info.fechaNac);
    crearFila(tabla, "Correo", info.correo);
    crearFila(tabla, "Carrera", info.carrera);
    crearFila(tabla, "País", info.pais);
    crearFila(tabla, "Intereses", info.intereses.join(", "));

    modalBody.appendChild(tabla);
    modal.show();
}


//  EVENTO PRINCIPAL
document.querySelector("button[name='btnRegistro']")
    .addEventListener("click", validarFormulario);
