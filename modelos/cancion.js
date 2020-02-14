const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

var CancionSchema = new Schema({
    artista: String,
    nombreCancion: String,
    album: String,
    ano: String,
    genero: String,
    url: String,
    imagen: String
});

module.exports = mongoose.model('Cancion', CancionSchema);

