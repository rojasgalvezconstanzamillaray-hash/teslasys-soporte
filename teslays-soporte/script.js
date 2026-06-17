let solicitudes = [];

function registrarSolicitud() {
    let nombre = document.getElementById("nombre").value;
    let correo = document.getElementById("correo").value;
    let area = document.getElementById("area").value;
    let tipo = document.getElementById("tipo").value;
    let descripcion = document.getElementById("descripcion").value;
    let mensaje = document.getElementById("mensaje");

    if (nombre === "" || correo === "" || area === "" || tipo === "" || descripcion === "") {
        mensaje.textContent = "Advertencia: ningún campo puede quedar vacío.";
        mensaje.style.color = "red";
    } else if (!correo.includes("@")) {
        mensaje.textContent = "Advertencia: el correo debe contener @.";
        mensaje.style.color = "red";
    } else {
        let solicitud = {
            nombre: nombre,
            correo: correo,
            area: area,
            tipo: tipo,
            descripcion: descripcion
        };

        solicitudes.push(solicitud);

        mensaje.textContent = "Solicitud registrada correctamente.";
        mensaje.style.color = "green";

        mostrarSolicitudes();
        limpiarFormulario();
    }
}

function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("area").value = "";
    document.getElementById("tipo").value = "";
    document.getElementById("descripcion").value = "";
}

function mostrarSolicitudes() {
    let tabla = document.getElementById("tablaSolicitudes");
    let total = document.getElementById("totalSolicitudes");

    tabla.innerHTML = "";

    solicitudes.forEach(function(solicitud, index) {
        tabla.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${solicitud.nombre}</td>
                <td>${solicitud.area}</td>
                <td>${solicitud.tipo}</td>
                <td>${solicitud.descripcion}</td>
            </tr>
        `;
    });

    total.textContent = "Total de solicitudes registradas: " + solicitudes.length;
}