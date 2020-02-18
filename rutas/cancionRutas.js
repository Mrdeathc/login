
const express = require('express');
const CancionControl = require('../control/cancionControl');
const multipart = require('connect-multiparty');
const subirImgDirectiorio = multipart({uploadDir: './archivos/canciones'});

var api = express.Router();

api.post('/cancion', CancionControl.crearCancion);
api.post('/buscarSong', CancionControl.cancionFind);
api.put('/ActualizarSong/:id', CancionControl.actualizarCancion);
api.get('/buscarSongs', CancionControl.cancionSearch);
api.delete('/deleteSongs/:id', CancionControl.deleteCancion);
api.put('/subir-img-cancion/:id', subirImgDirectiorio, CancionControl.imgCancion);
api.get('/mostrar-img-cancion/:imageFile', CancionControl.mostrarImg);
api.put('/subir-url-cancion/:id', subirImgDirectiorio, CancionControl.musicOne);
api.get('/mostrar-img-cancion/:urlFile', CancionControl.mostrarCancion);

module.exports = api;