/* 
    el modelo es la representacín en codigo de la estructura de nuestras tablas
    (Colecciones en Mongo) de neustra base de datos
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Creamos un objeto schema para nuestra colección

// Crearemos una instancia del objeto Schema

var UsuarioSchema = new Schema({
    nombre: String,
    apellido: String,
    correo: String,
    contrasena: String,
    rol: String,
    imagen: String
});

// Exportar el Schema
// mongoose.model recibe dos parametros que son el nombre de la coleccion
// y la estructura o el esquema (Schema) de la coleccion.

module.exports = mongoose.model('Usuario', UsuarioSchema);

