// Función para mostrar una alerta
function mostrarAlerta() {
    alert("¡Hola! Este es un mensaje de alerta");
}

// Función para mostrar un prompt
function mostrarPrompt() {
    let nombre = prompt("¿Cuál es tu nombre?", "");
    if (nombre != null && nombre != "") {
        document.getElementById("idParrafo").innerHTML = 
            "¡Hola " + nombre + "! Bienvenido a JavaScript";
    }
}

// Función para mostrar un confirm
function mostrarConfirm() {
    let respuesta = confirm("¿Estás seguro de que quieres continuar?");
    if (respuesta) {
        document.getElementById("idParrafo").innerHTML = 
            "Has confirmado la acción";
    } else {
        document.getElementById("idParrafo").innerHTML = 
            "Has cancelado la acción";
    }
}

// Función para dibujar párrafo
function dibujarParrafo() {
    let texto = prompt("Ingresa el texto que deseas mostrar:", "");
    if (texto != null && texto != "") {
        document.getElementById("idParrafo").innerHTML = texto;
    }
}