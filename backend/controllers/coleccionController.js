const { JuegoUser, Juego } = require('../models');

// Agregar un juego a la colección
// POST /api/coleccion
const agregarJuegoAColeccion = async (req, res) => {
    try {
        const {
            id_juego,
            estado,
            calificacion_personal,
            tiempo_de_juego_horas
        } = req.body;

        // Usuario obtenido desde el token JWT.
        const id_usuario = req.user.id;

        // Los datos ya fueron validados y normalizados por el middleware.
        const nuevaInteraccion = await JuegoUser.create({
            id_usuario,
            id_juego,
            estado,
            calificacion_personal,
            tiempo_de_juego_horas
        });

        return res.status(201).json({
            success: true,
            mensaje: "Videojuego añadido a tu colección con éxito.",
            data: nuevaInteraccion
        });
    } catch (error) {
        // Protección adicional ante una inserción duplicada.
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({
                success: false,
                error: "Este juego ya figura en tu colección."
            });
        }

        return res.status(500).json({
            success: false,
            error: "Error interno al guardar en la colección.",
            detalle: error.message
        });
    }
};

// Obtener la colección de un usuario
// GET /api/coleccion
const obtenerColeccion = async (req, res) => {
    try {
        // Usuario obtenido desde el token JWT.
        const id_usuario = req.user.id;

        // Trae la lista de interacciones e incluye los datos generales del juego.
        const miColeccion = await JuegoUser.findAll({
            where: { id_usuario },
            include: [
                {
                    model: Juego,
                    attributes: [
                        'titulo',
                        'url_imagen',
                        'slug',
                        'calificacion_global',
                        'id_rawg'
                    ]
                }
            ]
        });

        return res.status(200).json({
            success: true,
            data: miColeccion
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Error al recuperar tu colección.",
            detalle: error.message
        });
    }
};

// Eliminar un juego de la colección
// DELETE /api/coleccion/:id_juego
const eliminarJuegoDeColeccion = async (req, res) => {
    try {
        // El middleware ya validó el ID y comprobó que el registro existe.
        const registro = req.registroColeccion;

        // Borrado físico del registro relacional.
        await registro.destroy();

        return res.status(200).json({
            success: true,
            mensaje: "Juego removido de tu colección con éxito."
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Error al eliminar el juego de la colección.",
            detalle: error.message
        });
    }
};

// Actualizar un juego de la colección
// PUT /api/coleccion/:id_juego
const actualizarEstadoColeccion = async (req, res) => {
    try {
        const {
            estado,
            calificacion_personal,
            tiempo_de_juego_horas
        } = req.body;

        // El middleware ya validó los datos y comprobó que el registro existe.
        const registro = req.registroColeccion;

        await registro.update({
            estado:
                estado !== undefined
                    ? estado
                    : registro.estado,

            calificacion_personal:
                calificacion_personal !== undefined
                    ? calificacion_personal
                    : registro.calificacion_personal,

            tiempo_de_juego_horas:
                tiempo_de_juego_horas !== undefined
                    ? tiempo_de_juego_horas
                    : registro.tiempo_de_juego_horas
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

module.exports = {
    agregarJuegoAColeccion,
    obtenerColeccion,
    eliminarJuegoDeColeccion,
    actualizarEstadoColeccion
};