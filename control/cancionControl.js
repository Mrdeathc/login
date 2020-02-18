const Cancion = require('../modelos/cancion'); 
const fs = require('fs'); // importamos el Modulo File System de Node
const path = require('path'); // importamos el modulo math de Node

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

//

function cancionSearch(req, res){

        var parametros = req.body;
        var Songs = parametros.nombreCancion;
    
    Cancion.find({nombreCancion: Songs.toLowerCase()}, (err, cancionesEncontrada)=>{
        if(err){
            res.status(500).send({message: "Error en el servidor!!"});
        } else {
            if(!cancionesEncontrada){
                res.status(200).send({message: "No has podido encontrar la canción. Verifica los datos"});
            } else {
                res.status(200).send({cancion: cancionesEncontrada});
            }
        }
    });
    
    }

// 

function cancionFind(req, res){

    var parametros = req.body;
    var nameSong = parametros.nombreCancion;

Cancion.findOne({nombreCancion: nameSong.toLowerCase()}, (err, cancionEncontrada)=>{
    if(err){
        res.status(500).send({message: "Error en el servidor!!"});
    } else {
        if(!cancionEncontrada){
            res.status(200).send({message: "No has podido encontrar la canción. Verifica los datos"});
        } else {
            res.status(200).send({cancion: cancionEncontrada});
        }
    }
})                                                                      ;

}

// 

function actualizarCancion(req, res){
    var cancionId = req.params.id; 
    var nuevoDatoCancion = req.body;

    Cancion.findByIdAndUpdate(cancionId, nuevoDatoCancion, (err, cancionActualizada)=>{
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!cancionActualizada){
                res.status(200).send({message: "No fue posible actualizar los datos"})
            }else {
                res.status(200).send({nombreCancion: cancionActualizada});
            }
        }
    });
}

//

function deleteCancion(req, res){
    var cancionId2 = req.params.id;
    var deleteDatoCancion = req.body;

    Cancion.findByIdAndDelete(cancionId2, deleteDatoCancion, (err, cancionEliminada)=>{
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!cancionEliminada){
                res.status(200).send({message: "No fue posible eliminar la canción"})
            }else {
                res.status(200).send({cancion: cancionEliminada});
            }
        }
    });
}

// Subir Imagen 

function imgCancion(req, res){
    var cancionId2 = req.params.id;
    var nombreArchivo = "No ha subido ninguna imagen...";

    // Validar si efectivamente se está recibiendo la imagen o archivo

    if(req.files){
        // vamos a ir analizando la ruta del archivo el nombre y la extensión
        var rutaArchivo = req.files.imagen.path;
        console.log(rutaArchivo);

        var partirArchivo = rutaArchivo.split('\\');
        console.log(partirArchivo);

        var nombreArchivo = partirArchivo[2];
        console.log(nombreArchivo);

        var extensionImg = nombreArchivo.split('\.');
        console.log(extensionImg);

        var extensionArchivo = extensionImg[1];
        console.log(extensionArchivo);
        
        // Valida r si esl formato del archivo es aceptable

        if(extensionArchivo == "png" || extensionArchivo == "jpg" || extensionArchivo == "jpeg"){
            // Actualizar del usuario,  el campo imagen que inicialmente teniamos como modulo(null) en el modelo
            Cancion.findByIdAndUpdate(cancionId2, {imagen: nombreArchivo}, (err, cancionConImg)=>{
                if(err){
                    res.status(500).send({message: "Error en el servidor"});
                } else {
                    if(!cancionConImg){
                        res.status(200).send({message: "No fue posible subir la imagen"});
                    }else {
                        res.status(200).send({
                            imagen: nombreArchivo, 
                            cancion: cancionConImg
                        });
                    }
                }
            });
        }else{
            // Formato invalido
            res.status(200).send({message: "Formato inválido !! No es una imagen"});
        }

    } else {
        // No existe una img para subir
        res.status(200).send({message: "No ha subido ninguna imagen"});
    }
}

// Mostrar archivo

    function mostrarImg(req, res){
        // pedir el archivo que queremos mostrar
        var archivo = req.params.imageFile;
        // Verificamos la carpeta donde se encuetra el archivo
        var ruta = './archivos/canciones/' + archivo;
        // validar si existe la imagen
        // fs.exists ('el archivo a verificar si existe o no el archivo')
        fs.exists(ruta, (exists)=>{
            if(exists){
                res.sendFile(path.resolve(ruta));
            }else{
                res.status(200).send({message: "imagen no encontrada"});
            }
        });

    }

// Subir Cancion

function musicOne(req, res){
    var cancionId2 = req.params.id;
    var url = "No ha subido ninguna cancion...";

    // Validar si efectivamente se está recibiendo la imagen o archivo

    if(req.files){
        // vamos a ir analizando la ruta del archivo el nombre y la extensión
        var rutaArchivo = req.files.url.path;
        console.log(rutaArchivo);

        var partirArchivo = rutaArchivo.split('\\');
        console.log(partirArchivo);

        var url = partirArchivo[2];
        console.log(url);

        var extensionImg = url.split('\.');
        console.log(extensionImg);

        var extensionArchivo = extensionImg[1];
        console.log(extensionArchivo);
        
        // Valida r si esl formato del archivo es aceptable

        if(extensionArchivo == "mp3"){
            // Actualizar del usuario,  el campo imagen que inicialmente teniamos como modulo(null) en el modelo
            Cancion.findByIdAndUpdate(cancionId2, {url: url}, (err, cancionConImg)=>{
                if(err){
                    res.status(500).send({message: "Error en el servidor"});
                } else {
                    if(!cancionConImg){
                        res.status(200).send({message: "No fue posible subir la cancion"});
                    }else {
                        res.status(200).send({
                            url: url, 
                            cancion: cancionConImg
                        });
                    }
                }
            });
        }else{
            // Formato invalido
            res.status(200).send({message: "Formato inválido !! No es una cancion"});
        }

    } else {
        // No existe una img para subir
        res.status(200).send({message: "No ha subido ninguna cancion"});
    }
}

// Mostrar archivo

    function mostrarCancion(req, res){
        // pedir el archivo que queremos mostrar
        var archivo = req.params.urlFile;
        // Verificamos la carpeta donde se encuetra el archivo
        var ruta = './archivos/canciones/' + archivo;
        // validar si existe la imagen
        // fs.exists ('el archivo a verificar si existe o no el archivo')
        fs.exists(ruta, (exists)=>{
            if(exists){
                res.sendFile(path.resolve(ruta));
            }else{
                res.status(200).send({message: "cancion no encontrada"});
            }
        });

    }

module.exports = {
    crearCancion,
    cancionFind,
    actualizarCancion,
    cancionSearch,
    deleteCancion,
    imgCancion,
    mostrarImg,
    musicOne,
    mostrarCancion
}

