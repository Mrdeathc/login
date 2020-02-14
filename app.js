/* 
    Va a contener toda la logica de ruteo de Express.
    Declaración de rutas, uso de middleware body-parser.
    Parmisos de acceso a cualquier cliente (Permisos al aplicativo Front heacho en Angular)
*/

const express = require ('express'); // importamos express 
const bodyParser = require('body-parser'); // Permitir analizar daros de la URL

const app = express(); // Aplicacion express

// Solicitar las rutas de acceso a cada función que ejecutará nuestra aplicación 

const usuarioRutas = require('./rutas/usuarioRutas');    
const cancionRutas = require('./rutas/cancionRutas');    
app.use(bodyParser.json());
// -- MIDDLEWARES -- 

//Declaramos el analisis de datos con body-parser
// Configuración de permisis de acceso


// Consumo de las rutas

app.use('/api', usuarioRutas);
app.use('/api', cancionRutas);

// -- FIN MIDDLEWARES --

module.exports = app;