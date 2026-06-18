let solicitudes = [];

function mostrarAlerta(mensaje, tipo = 'error') {
    const alertElement = document.getElementById("mensaje");
    alertElement.textContent = mensaje;
    alertElement.className = 'alert ' + tipo;
    
    // Auto-hide después de 5 segundos
    if (tipo === 'success') {
        setTimeout(() => {
            alertElement.className = 'alert';
            alertElement.textContent = '';
        }, 5000);
    }
}

function validarFormulario() {
    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const area = document.getElementById("area").value.trim();
    const tipo = document.getElementById("tipo").value;
    const descripcion = document.getElementById("descripcion").value.trim();
    
    if (!nombre || !correo || !area || !tipo || !descripcion) {
        mostrarAlerta("⚠️ Por favor, complete todos los campos del formulario.", "error");
        return false;
    }
    
    if (!validarEmail(correo)) {
        mostrarAlerta("⚠️ Por favor, ingrese un correo electrónico válido.", "error");
        return false;
    }
    
    if (descripcion.length < 10) {
        mostrarAlerta("⚠️ La descripción debe tener al menos 10 caracteres.", "error");
        return false;
    }
    
    return true;
}

function validarEmail(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
}

function registrarSolicitud() {
    if (!validarFormulario()) {
        return;
    }
    
    const solicitud = {
        nombre: document.getElementById("nombre").value.trim(),
        correo: document.getElementById("correo").value.trim(),
        area: document.getElementById("area").value.trim(),
        tipo: document.getElementById("tipo").value,
        descripcion: document.getElementById("descripcion").value.trim()
    };

    solicitudes.push(solicitud);
    mostrarAlerta("✅ ¡Solicitud registrada correctamente! Será procesada pronto.", "success");
    mostrarSolicitudes();
    limpiarFormulario();
}

function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("area").value = "";
    document.getElementById("tipo").value = "";
    document.getElementById("descripcion").value = "";
}

function mostrarSolicitudes() {
    const tabla = document.getElementById("tablaSolicitudes");
    const totalElement = document.getElementById("totalSolicitudes");

    tabla.innerHTML = "";

    if (solicitudes.length === 0) {
        tabla.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #9ca3af; padding: 2rem;">No hay solicitudes registradas aún</td></tr>';
        totalElement.textContent = "Total: 0 solicitudes";
        return;
    }

    solicitudes.forEach((solicitud, index) => {
        const descripcionCorta = solicitud.descripcion.substring(0, 50) + (solicitud.descripcion.length > 50 ? '...' : '');
        tabla.innerHTML += `
            <tr>
                <td><strong>${index + 1}</strong></td>
                <td>${solicitud.nombre}</td>
                <td>${solicitud.area}</td>
                <td><span style="background: #e6f0ff; padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.85rem; font-weight: 600; color: #0066cc;">${solicitud.tipo}</span></td>
                <td title="${solicitud.descripcion}">${descripcionCorta}</td>
            </tr>
        `;
    });

    totalElement.textContent = `Total: ${solicitudes.length} solicitud${solicitudes.length !== 1 ? 'es' : ''}`;
}