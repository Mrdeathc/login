/* 
    Se encargara de recibir los datos que el usuario realiza desde la vista, procesandolos
    para enviarlos al modelo y que este los pueda corroborar con la base de datos para posteriormente
    guardarlos, tambien tendra toda la logica de las consultas, actualizaciones y eliminaciones.
*/

const Usuario = require('../modelos/usuario'); // Importamos el modelo de usuario


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

// Exportacion de las funciones creadas 

module.exports = {
    crearUsuario,
    login
}