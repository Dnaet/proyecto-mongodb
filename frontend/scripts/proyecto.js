
window.addEventListener('load', function () {
    cargarUsuarios();
});

function validarProyecto() {

    const nombre = document.getElementById('inputNombreProyecto');
    const usuario = document.getElementById('selectUsuario');
    const descripcion = document.getElementById('inputDescripcion');
    const fechaInicio = document.getElementById('inputFechaInicio');
    const estado = document.getElementById('selectEstado');

    let formularioValido = true;

    if (!validarInput(nombre)) { formularioValido = false; }
    if (!validarInput(usuario)) { formularioValido = false; }
    if (!validarInput(descripcion)) { formularioValido = false; }
    if (!validarInput(fechaInicio)) { formularioValido = false; }
    if (!validarInput(estado)) { formularioValido = false; }

    if (formularioValido) {

        alert('Proyecto registrado correctamente.');

        const datosProyecto = {
            usuario: document.getElementById('selectUsuario').value,
            nombre: document.getElementById('inputNombreProyecto').value,
            descripcion: document.getElementById('inputDescripcion').value,
            fechaInicio: document.getElementById('inputFechaInicio').value,
            fechaFin: document.getElementById('inputFechaFin').value,
            estado: document.getElementById('selectEstado').value,
            presupuesto: document.getElementById('inputPresupuesto').value,
            prioridad: document.getElementById('selectPrioridad').value,
            categoria: document.getElementById('inputCategoria').value,
            avance: document.getElementById('inputAvance').value
        };

        enviarProyecto(datosProyecto);
    }
}

function validarInput(elemento) {
    if (elemento.value === '') {
        elemento.classList.add('alerta', 'is-invalid');
        return false;
    } else {
        elemento.classList.remove('alerta', 'is-invalid');
        elemento.classList.add('correcto', 'is-valid');
        return true;
    }
}

async function cargarUsuarios() {
    try {
        const respuesta = await fetch('http://localhost:3000/listarUsuarios');

        if (respuesta.ok) {
            const usuarios = await respuesta.json();

            const select = document.getElementById('selectUsuario');

            usuarios.forEach(usuario => {
                const option = document.createElement('option');

                option.value = usuario._id;
                option.textContent =
                    usuario.nombre + ' - ' + usuario.rut;

                select.appendChild(option);
            });
        }
    }
    catch (error) {
        console.log('Error al cargar usuarios:', error);
    }
}

async function enviarProyecto(datosProyecto) {
    try {
        const respuesta = await fetch(
            'http://localhost:3000/guardarProyecto',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosProyecto)
            }
        );

        if (respuesta.ok) {
            window.location.href = './datos.html';
        }
        else {
            console.log(await respuesta.json());
        }
    }
    catch (error) {
        console.log('Error al guardar el proyecto:', error);
    }
}

