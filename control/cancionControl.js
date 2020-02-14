const Cancion = require('../modelos/cancion'); 

function crearCancion(req, res){

    var cancion = new Cancion();

    var parametros = req.body;
    
    cancion.artista = parametros.artista;
    cancion.nombreCancion = parametros.nombreCancion;
    cancion.album = parametros.album;
    cancion.ano = parametros.ano;
    cancion.genero = parametros.genero;
    cancion.url = null;
    cancion.imagen = null;

    cancion.save((err, cancionNuevo)=>{
        if(err){
            res.status(500).send({ message: "Error en el servidor"});
        } else {
            if(!cancionNuevo){

                res.status(200).send({message: "No fue posible subir la canción"});
            } else {
                res.status(200).send({cancion: cancionNuevo});
            }
        }
    });

}

module.exports = {
    crearCancion
}

