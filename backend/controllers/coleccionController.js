const { JuegoUser, Juego } = require('../models');

// Agregar un juego a la coleccion
// POST /api/coleccion
const agregarJuegoAColeccion = async (req, res) => {
    try {
        const { id_juego, estado, calificacion_personal, tiempo_de_juego_horas } = req.body;
        
        // Hardcodeamos provisionalmente el usuario 1 hasta enganchar el JWT
        const id_usuario = req.body.id_usuario || 1; 

        if (!id_juego) {
            return res.status(400).json({ success: false, error: "El campo id_juego es obligatorio." });
        }

        // Creamos la fila en la tabla intermedia
        const nuevaInteraccion = await JuegoUser.create({
            id_usuario,
            id_juego,
            estado: estado ? estado.toLowerCase() : 'pendiente',
            calificacion_personal: calificacion_personal || null,
            tiempo_de_juego_horas: tiempo_de_juego_horas || 0
        });

        return res.status(201).json({ 
            success: true, 
            mensaje: "Videojuego añadido a tu colección con éxito.", 
            data: nuevaInteraccion 
        });

    } catch (error) {
        // Captura si el usuario quiere meter dos veces el mismo juego (Unicidad de la clave compuesta)
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ success: false, error: "Este juego ya figura en tu colección." });
        }
        return res.status(500).json({ success: false, error: "Error interno al guardar en la colección.", detalle: error.message });
    }
};
// Obtener la coleccion de un usuario
// GET /api/coleccion
const obtenerColeccion = async(req,res) =>{
    try {
        const id_usuario = req.query.id_usuario || 1; 

        // Trae la lista de interacciones e incluye los datos generales del juego
        const miColeccion = await JuegoUser.findAll({
            where: { id_usuario },
            include: [{
                model: Juego,
                attributes: ['titulo', 'url_imagen', 'slug', 'calificacion_global'] 
            }]
        });

        return res.status(200).json({ success: true, data: miColeccion });

    } catch (error) {
        return res.status(500).json({ success: false, error: "Error al recuperar tu colección.", detalle: error.message });
    }
}

// Eliminar un juego de la colec
// DELETE /api/coleccion/:id_juego
const eliminarJuegoDeColeccion = async(req,res) =>{
    try {
        const { id_juego } = req.params;
        const id_usuario = req.body.id_usuario || 1;

        const registro = await JuegoUser.findOne({ where: { id_usuario, id_juego } });

        if (!registro) {
            return res.status(404).json({ success: false, error: "El juego no estaba en tu colección." });
        }

        // Borrado físico del registro relacional
        await registro.destroy();
        
        return res.status(200).json({ success: true, mensaje: "Juego removido de tu colección con éxito." });

    } catch (error) {
        return res.status(500).json({ success: false, error: "Error al eliminar el juego de la colección." });
    }
}

// PUT /api/coleccion/:id_juego
const actualizarEstadoColeccion = async (req, res) => {
    try {
        const { id_juego } = req.params;
        const { estado, calificacion_personal, tiempo_de_juego_horas } = req.body;
        const id_usuario = req.body.id_usuario || 1;

        const registro = await JuegoUser.findOne({
            where: { id_usuario, id_juego }
        });

        if (!registro) {
            return res.status(404).json({
                success: false,
                error: "El videojuego no se encuentra en la colección."
            });
        }

        await registro.update({
            estado: estado ? estado.toLowerCase() : registro.estado,
            calificacion_personal: calificacion_personal !== undefined ? calificacion_personal : registro.calificacion_personal,
            tiempo_de_juego_horas: tiempo_de_juego_horas !== undefined ? tiempo_de_juego_horas : registro.tiempo_de_juego_horas
        });

        return res.status(200).json({
            success: true,
            mensaje: "Progreso de la colección actualizado",
            data: registro
        });

    } catch (error) {
        console.error("Error al modificar colección:", error);

        return res.status(500).json({
            success: false,
            error: "Error al modificar los datos de la colección.",
            detalle: error.message
        });
    }
};

module.exports = {agregarJuegoAColeccion, obtenerColeccion, eliminarJuegoDeColeccion, actualizarEstadoColeccion};