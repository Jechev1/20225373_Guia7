// FORMULARIO DONDE SE AGREGARÁN LOS CONTROLES NUEVOS
const newForm = document.getElementById("idNewForm");

// BOTONES
const buttonCrear = document.getElementById("idBtnCrear");
const buttonAddElemento = document.getElementById("idBtnAddElement");
const btnValidar = document.getElementById("btnValidar");

// SELECT PARA ELEGIR EL TIPO DE ELEMENTO A CREAR
const cmbElemento = document.getElementById("idCmbElemento");

// CONTROLES DEL MODAL
const tituloElemento = document.getElementById("idTituloElemento");
const nombreElemento = document.getElementById("idNombreElemento");

// MODAL BOOTSTRAP
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

// VALIDAR ID REPETIDO --------------------
function idRepetido(id) {
    const elementos = newForm.querySelectorAll("[id]");
    for (let el of elementos) {
        if (el.id === id) return true;
    }
    return false;
}

// MOSTRAR MODAL --------------------
const vericarTipoElemento = () => {
    let elemento = cmbElemento.value;
    if (elemento !== "") {
        modal.show();
    } else {
        alert("Debe seleccionar el elemento que se creará");
    }
};

// CREAR SELECT --------------------
const newSelect = () => {
    if (idRepetido(nombreElemento.value)) {
        alert("El ID ya existe, elija otro.");
        return;
    }

    let select = document.createElement("select");
    select.id = nombreElemento.value;
    select.className = "form-select";

    for (let i = 1; i <= 10; i++) {
        let opt = document.createElement("option");
        opt.value = i;
        opt.textContent = `Opción ${i}`;
        select.appendChild(opt);
    }

    let label = document.createElement("label");
    label.setAttribute("for", select.id);
    label.textContent = tituloElemento.value;

    let spanId = document.createElement("span");
    spanId.className = "d-block mt-3 mb-2 text-muted";
    spanId.textContent = `ID de control: ${select.id}`;

    let div = document.createElement("div");
    div.className = "form-floating mb-3";

    div.appendChild(select);
    div.appendChild(label);

    newForm.appendChild(spanId);
    newForm.appendChild(div);
};

//  CREAR RADIO / CHECKBOX --------------------
const newRadioCheckbox = (tipo) => {
    if (idRepetido(nombreElemento.value)) {
        alert(" El ID ya existe, elija otro.");
        return;
    }

    let input = document.createElement("input");
    input.type = tipo;
    input.id = nombreElemento.value;
    input.name = nombreElemento.value;
    input.className = "form-check-input";

    let label = document.createElement("label");
    label.className = "form-check-label";
    label.setAttribute("for", input.id);
    label.textContent = tituloElemento.value;

    let spanId = document.createElement("span");
    spanId.className = "d-block mt-3 mb-2 text-muted";
    spanId.textContent = `ID de control: ${input.id}`;

    let div = document.createElement("div");
    div.className = "form-check mb-3";

    div.appendChild(input);
    div.appendChild(label);

    newForm.appendChild(spanId);
    newForm.appendChild(div);
};

// CREAR INPUTS GENERALES (text, email, color, number, etc.) --------------------
const newInput = (tipo) => {
    if (idRepetido(nombreElemento.value)) {
        alert(" El ID ya existe, elija otro.");
        return;
    }

    let elemento;

    if (tipo === "textarea") {
        elemento = document.createElement("textarea");
    } else {
        elemento = document.createElement("input");
        elemento.type = tipo;
    }

    elemento.id = nombreElemento.value;
    elemento.className = "form-control";
    elemento.placeholder = tituloElemento.value;

    let label = document.createElement("label");
    label.setAttribute("for", elemento.id);
    label.textContent = tituloElemento.value;

    let icon = document.createElement("i");
    icon.className = "bi bi-tag";
    label.insertAdjacentElement("afterbegin", icon);

    let spanId = document.createElement("span");
    spanId.className = "d-block mt-3 mb-2 text-muted";
    spanId.textContent = `ID de control: ${elemento.id}`;

    let div = document.createElement("div");
    div.className = "form-floating mb-3";

    div.appendChild(elemento);
    div.appendChild(label);

    newForm.appendChild(spanId);
    newForm.appendChild(div);
};

// EVENTO: CREAR ELEMENTO --------------------
buttonAddElemento.onclick = () => {
    if (nombreElemento.value !== "" && tituloElemento.value !== "") {
        let tipo = cmbElemento.value;

        if (tipo === "select") newSelect();
        else if (tipo === "radio" || tipo === "checkbox") newRadioCheckbox(tipo);
        else newInput(tipo);

        modal.hide();
    } else {
        alert(" Debe completar todos los campos.");
    }
};

//  LIMPIAR CAMPOS AL ABRIR MODAL --------------------
document.getElementById("idModal").addEventListener("shown.bs.modal", () => {
    tituloElemento.value = "";
    nombreElemento.value = "";
    tituloElemento.focus();
});

// BOTÓN CREAR ELEMENTO --------------------
buttonCrear.onclick = () => vericarTipoElemento();

// VALIDAR FORMULARIO COMPLETO --------------------
btnValidar.addEventListener("click", function () {

    const elementos = newForm.querySelectorAll("input, select, textarea");
    let mensajes = [];
    let valido = true;

    elementos.forEach(el => {

        if (el.tagName === "INPUT") {

            if (
                ["text", "email", "color", "date", "number", "password"].includes(el.type)
                && el.value.trim() === ""
            ) {
                mensajes.push(`El campo ${el.id} está vacío`);
                valido = false;
            }

            if (el.type === "radio" || el.type === "checkbox") {
                const grupo = newForm.querySelectorAll(`input[name="${el.name}"]`);
                const algunoMarcado = [...grupo].some(g => g.checked);
                if (!algunoMarcado) {
                    mensajes.push(`Debe seleccionar una opción del grupo ${el.name}`);
                    valido = false;
                }
            }

        } else if (el.tagName === "SELECT") {
            if (!el.value) {
                mensajes.push(`Debe seleccionar una opción en ${el.id}`);
                valido = false;
            }
        } else if (el.tagName === "TEXTAREA") {
            if (el.value.trim() === "") {
                mensajes.push(`El campo ${el.id} está vacío`);
                valido = false;
            }
        }
    });

    if (valido) alert("Toda la información es válida");
    else alert("Errores:\n\n" + mensajes.join("\n"));
});
