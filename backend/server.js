// Instanciamos/Importamos las depedencias necesarias y las almacenamos en una constante
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Iniciamos nuestra aplicación express
const aplicacion = express();
const puerto = 3000;

// Instanciamos las depedencias de la aplicación
aplicacion.use(cors());
aplicacion.use(express.json());

// Crear la conexión con DB
mongoose.connect('mongodb://localhost:27017/test')
    .then(() => console.log('Conexión Exitosa!'))
    .catch((excepcion) => console.log('No ha sido posible conectarse con la DB, error ocurrido: ', excepcion));

const usuario = new mongoose.Schema({
    nombre: String,
    rut: String,
    nacionalidad: Number,
    email: String,
    celular: String,
    fechaNacimiento: Date,
    contrasena: String,
    direccion: String,
    foto: String
});

const Usuario = mongoose.model('Usuario',usuario,'usuarios');