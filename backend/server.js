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

const usuario = new mongoose.Schema({
    nombre: String,
    rut: String,
    nacionalidad: String,
    email: String,
    celular: String,
    fechaNacimiento: Date,
    contrasena: String,
    direccion: [direccion],
    foto: {
        filename: String,
        path: String,
        mimetype: String
    }
});

const pais = new mongoose.Schema({
    nombre: String,
    iso2: String,
    iso3: String,
    codigoPais: String,
    nacionalidad: String
});

const Usuario = mongoose.model('Usuario', usuario, 'usuarios');

const Pais = mongoose.model('Pais', pais, 'paises');

aplicacion.post('/guardarUsuario', async (req, res) => {
    try {
        const { nombre, rut, nacionalidad, email, celular, fechaNacimiento, contrasena, direccion, foto } = req.body;
        const direccionUsuario = JSON.parse(direccion);

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(contrasena, salt);

        const nuevoUsuario = new Usuario({ nombre, rut, nacionalidad, email, celular, fechaNacimiento, contrasena:hash, direccion: direccionUsuario, foto });
        await nuevoUsuario.save();

        res.status(200).json({ mensaje: 'Datos almacenados correctamente.' })
    }
    catch (error) {
        res.status(500).json({ mensaje: 'No se han podido guardar los datos. ', error });
    };
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

aplicacion.get('/obtenerPaises', async (req, res) => {
    try {
        const paises = await Pais.find();
        res.json(paises);
    } catch (error) {
        res.status(500).json({ mensaje: 'No se han podido obtener los datos. ', error });
    }
});