window.addEventListener('load', function () {
    obtenerProyectos();
});

async function obtenerProyectos() {
    try {
        const respuesta = await fetch('http://localhost:3000/obtenerProyectos');

        if (respuesta.ok) {
            const proyectos = await respuesta.json();

            console.log(proyectos);

            new DataTable('#tablaProyectos', {
                data: proyectos,
                columns: [
                    { data: 'nombre' },
                    {
                        data: 'datosUsuario',
                        render: d => d?.[0]?.nombre || 'Sin usuario'
                    },
                    {
                        data: 'datosUsuario',
                        render: d => d?.[0]?.rut || 'Sin rut'
                    },
                    { data: 'estado' },
                    { data: 'prioridad' },
                    {
                        data: 'fechaFin',
                        render: d => d ? new Date(d).toLocaleDateString() : 'Sin fecha'
                    }
                ]
            });
        }
    } catch (error) {
        console.log('Error al cargar proyectos:', error);
    }
}
