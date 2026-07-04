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
                    // 1. Nombre proyecto
                    { data: 'nombre' },

                    // 2. Usuario responsable (nombre)
                    {
                        data: 'datosUsuario',
                        render: function (data) {
                            return data?.[0]?.nombre || 'Sin usuario';
                        }
                    },

                    // 3. Rut del usuario
                    {
                        data: 'datosUsuario',
                        render: function (data) {
                            return data?.[0]?.rut || 'Sin rut';
                        }
                    },

                    // 4. Estado
                    { data: 'estado' },

                    // 5. Prioridad
                    { data: 'prioridad' },

                    // 6. Fecha fin
                    {
                        data: 'fechaFin',
                        render: function (data) {
                            return data
                                ? new Date(data).toLocaleDateString()
                                : 'Sin fecha';
                        }
                    }
                ]
            });
        }
    } catch (error) {
        console.log('Error al cargar proyectos:', error);
    }
}