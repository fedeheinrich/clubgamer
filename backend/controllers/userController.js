const {User} = requiere('../models')

//obtenerTodosLosUsuarios
const obtenerTodosLosUsuarios = async(req, res) => {
    try{
        const users = await User.findAll();

        res.status(200).json({
            success: true, data: users
        });
    }catch(error){
        console.error(error)
        return res.status(500).json({
            success: false, error: "Error al obtener todos los usuarios"
        });
    }
}
//actualizarUsuario
const actualizarUsuario = async(req, res) => {
    try{
        const {id} = req.params;
        const user = await User.findByPk(id);
        
        if (!user){
            return res.status(404).json({
                success: false, error: "Error al encontrar el usuario"
            });
        }

        const datosParaActualizar = {}

        if (req.body.nombre){
            datosParaActualizar.nombre = req.body.nombre;
        }

        if(req.body.email){
            datosParaActualizar.email = req.body.email
        }

        await user.update(datosParaActualizar);

        return res.status(200).json({
            success: true, mensaje: "usuario actualizado", data: user
        });

    }catch(error){
        console.error(error)

        return res.status(500).json({
            success: false, error: "Error al actualizar el usuario"
        });
    }
}
//eliminarUsuario:
const eliminarUsuario = async(req,res) => {
    try{
        const {id} = req.params;
        const user = User.findByPK(id)

        if (!user){
            return res.status(404).json({
                success: false, error: "Error al encontrar el usuario"
            });
        }

        await user.destroy()

        return res.status(200).json({
            success: true, mensaje: "Usuario eliminado correctamente"
        })
    }catch(error){
        console.error(error)

        return res.status(500).json({
            success: false, error: "Error al eliminar usuario"
        });
    }
}

module.exports = {obtenerTodosLosUsuarios, actualizarUsuario, eliminarUsuario};