const { Juego } = require('../../models');

const validarEliminarJuego = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        // Validar ID de la URL
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                error: 'El ID debe ser un número entero positivo.'
            });
        }

        // Buscar el juego en la base de datos local
        const juego = await Juego.findByPk(id);

        if (!juego) {
            return res.status(404).json({
                success: false,
                error: 'El juego que intenta eliminar no existe.'
            });
        }

        // Guardamos los datos para que el controlador no consulte otra vez
        req.params.id = id;
        req.juego = juego;

        next();
    } catch (error) {
        console.error('Error al validar la eliminación del juego:', error);

        return res.status(500).json({
            success: false,
            error: 'Error al validar la eliminación del juego.'
        });
    }
};

module.exports = {
    validarEliminarJuego
};