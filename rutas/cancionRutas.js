
const express = require('express');
const CancionControl = require('../control/cancionControl');

var api = express.Router();

api.post('/cancion', CancionControl.crearCancion);
module.exports = api;