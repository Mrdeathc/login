/* 
    Se encargara de recibir los datos que el usuario realiza desde la vista, procesandolos
    para enviarlos al modelo y que este los pueda corroborar con la base de datos para posteriormente
    guardarlos, tambien tendra toda la logica de las consultas, actualizaciones y eliminaciones.
*/

const Usuario = require('../modelos/usuario'); // Importamos el modelo de usuario
const fs = require('fs'); // importamos el Modulo File System de Node
const path = require('path'); // importamos el modulo math de Node


// Funcion registro de usuario
function crearUsuario(req, res){
    // Instanciar el objeto Usuario 
    var usuario = new Usuario();

    // Guardar el cuerpo de la petición para mejor acceso de los datos que el usuario esta enviando
    // parametros = {"nombre": "", "apellido": "", "correo": "", "contraseña": ""}

    var parametros = req.body;

    //
    
    usuario.nombre = parametros.nombre;
    usuario.apellido = parametros.apellido;
    usuario.correo = parametros.correo;
    usuario.contrasena = parametros.contrasena;
    usuario.rol = "usuario";
    usuario.imagen = null;

    // Guardar y validar los datos
    // db.coleccion.insert()
    usuario.save((err, usuarioNuevo)=>{
        if(err){
            // El primner error a validar sera a nivel de servidor e infraestructura
            // para esto existen states o estados.
            res.status(500).send({ message: "Error en el servidor"});
        } else {
            if(!usuarioNuevo){
                // 404 -> Pagina no encontrada
                // 200 -> Ok pero con una alerta indicando que los datos invalidos
                res.status(200).send({message: "No fue posible realizar el registro"});
            } else {
                res.status(200).send({usuario: usuarioNuevo});
            }
        }
    });

}

// LOGIN USUARIO

function login(req, res){
    var parametros = req.body;
    var correoUsuario = parametros.correo;
    var contraUsuario = parametros.contrasena;

    // Buscamos al usuario a través del correo. Usaremos toLowerCase() para evitar problema de datos

    Usuario.findOne({correo: correoUsuario.toLowerCase()}, (err, usuarioLogueado)=>{
        if(err){
            res.status(500).send({message: "Error en el servidor!!"});
        } else {
            if(!usuarioLogueado){
                res.status(200).send({message: "No has podido iniciar sesión. Verifica los datos"});
            }else{
                if(usuarioLogueado.contrasena != contraUsuario){
                    res.status(200).send({message: "Contraseña incorrecta"});
                }else{
                    res.status(200).send({usuario: usuarioLogueado});
                }
            }
        }
    });
}

// Actualizar Usuario

function actualizarUsuario(req, res){
    var usuarioId = req.params.id; // 
    var nuevosDatosUsuario = req.body;

    Usuario.findByIdAndUpdate(usuarioId, nuevosDatosUsuario, (err, usuarioActualizado)=>{
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!usuarioActualizado){
                res.status(200).send({message: "No fue posible actualizar los datos"})
            }else {
                res.status(200).send({usuario: usuarioActualizado});
            }
        }
    });
}

// Subir Imagen 

function subirImg(req, res){
    var usuarioId = req.params.id;
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
            Usuario.findByIdAndUpdate(usuarioId, {imagen: nombreArchivo}, (err, usuarioConImg)=>{
                if(err){
                    res.status(500).send({message: "Error en el servidor"});
                } else {
                    if(!usuarioConImg){
                        res.status(200).send({message: "No fue posible subir la imagen"});
                    }else {
                        res.status(200).send({
                            imagen: nombreArchivo, 
                            usuario: usuarioConImg
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
        var ruta = './archivos/usuarios/' + archivo;
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

// Exportacion de las funciones creadas 

module.exports = {
    crearUsuario,
    login,
    actualizarUsuario,
    subirImg,
    mostrarImg
}