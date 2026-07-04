// Instanciamos/Importamos las depedencias necesarias y las almacenamos en una constante
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Iniciamos nuestra aplicación express
const aplicacion = express();
const puerto = 3000;

// Instanciamos las depedencias de la aplicación
aplicacion.use(cors());
aplicacion.use(express.json());

// Crear la conexión con DB
mongoose.connect('mongodb://localhost:27017/AP-N3-C2')
    .then(() => console.log('Conexión Exitosa!'))
    .catch((excepcion) => console.log('No ha sido posible conectarse con la DB, error ocurrido: ', excepcion));

const PORT = process.env.PORT || 3000;
aplicacion.listen(PORT, 'localhost', () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

const direccion = new mongoose.Schema({
    comuna: String,
    calle: String,
    numero: String,
    departamento: String
});


//el Schrema con las modificaciones

const usuario = new mongoose.Schema({

    nombre: String,
    rut: String,
    correo: String,
    telefono: String,
    fechaNacimiento: Date,
    nacionalidad: String,
    genero: String,
    direccion: [direccion],
    contrasena: String,
    fechaRegistro: Date,
    activo: Boolean

});

// nuevo Shrema Proyecto 

const proyecto = new mongoose.Schema({

    usuario:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Usuario'
    },
    nombre: String,
    descripcion: String,
    fechaInicio: Date,
    fechaFin: Date,
    estado: String,
    presupuesto: Number,
    prioridad: String,
    categoria: String,
    avance: Number
});


const pais = new mongoose.Schema({
    nombre: String,
    iso2: String,
    iso3: String,
    codigoPais: String,
    nacionalidad: String
});

const Usuario = mongoose.model('Usuario', usuario, 'usuarios');

const Proyecto = mongoose.model('Proyecto', proyecto, 'proyectos');

const Pais = mongoose.model('Pais', pais, 'paises');

aplicacion.post('/guardarUsuario', async (req, res) => {
    try {
        const { nombre, rut, correo, telefono, fechaNacimiento, nacionalidad, genero, contrasena, direccion } = req.body;

        const direccionUsuario = JSON.parse(direccion);
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(contrasena, salt);

        const nuevoUsuario = new Usuario({ nombre, rut, correo, telefono, fechaNacimiento, nacionalidad, genero, contrasena: hash, direccion: direccionUsuario, fechaRegistro: new Date(), activo: true });
        await nuevoUsuario.save();

        res.status(200).json({ mensaje: 'Datos almacenados correctamente.' })
    }
    catch (error) {
        res.status(500).json({ mensaje: 'No se han podido guardar los datos. ', error });
    };
});

aplicacion.post('/guardarProyecto', async (req, res) => {

    try {

        const { usuario, nombre, descripcion, fechaInicio, fechaFin, estado, presupuesto, prioridad, categoria, avance } = req.body;
        const nuevoProyecto = new Proyecto({ usuario, nombre, descripcion, fechaInicio, fechaFin, estado, presupuesto, prioridad, categoria, avance });

        await nuevoProyecto.save();

        res.status(200).json({
            mensaje: 'Proyecto guardado correctamente.'
        });

    } catch (error) {

        res.status(500).json({
            mensaje: 'No se pudo guardar el proyecto.',
            error
        });

    }

});

aplicacion.get('/obtenerUsuarios', async (req, res) => {
    try {
        const usuarios = await Usuario.aggregate([{
            $lookup: {
                from: 'paises', // Colección que tiene los datos que aagregaremos
                localField: 'nacionalidad', // Campo que contiene los datos relacionados a la segunda colección
                foreignField: 'iso2', // campo de la colección secundaria registrado en la colección primaria
                as: 'paisOrigen'
            }
        }]);
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: 'No se han podido obtener los datos. ', error });
    }
});

aplicacion.get('/listarUsuarios', async (req, res) => {
    try {
        const usuarios = await Usuario.find();

        res.json(usuarios);

    } catch (error) {
        res.status(500).json({
            mensaje: 'No se pudieron obtener los usuarios.',
            error
        });
    }
});


aplicacion.get('/obtenerProyectos', async (req, res) => {

    try {

        const proyectos = await Proyecto.aggregate([
            {
                $lookup: {
                    from: 'usuarios',
                    localField: 'usuario',
                    foreignField: '_id',
                    as: 'datosUsuario'
                }
            }
        ]);

        res.json(proyectos);

    } catch (error) {

        res.status(500).json({
            mensaje: 'No se han podido obtener los datos.',
            error
        });
    }
});

aplicacion.get('/obtenerPaises', async (req, res) => {
    try {
        const paises = await Pais.find();
        res.json(paises);
    } catch (error) {
        res.status(500).json({ mensaje: 'No se han podido obtener los datos. ', error });
    }
});