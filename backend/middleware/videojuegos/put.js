const { Juego } = require('../../models');

const validarActualizarJuego = async (req, res, next) => {
    try {
        const { id } = req.params;

        const juego = await Juego.findByPk(id);

        if (!juego) {
            return res.status(404).json({
                success: false,
                error: 'Juego no encontrado'
            });
        }

        const {
            calificacion_global,
            lanzamiento
        } = req.body;

        if (
            calificacion_global !== undefined &&
            (
                isNaN(parseFloat(calificacion_global)) ||
                calificacion_global < 0 ||
                calificacion_global > 5
            )
        ) {
            return res.status(400).json({
                success: false,
                error: 'La calificación debe estar entre 0 y 5.'
            });
        }

        if (
            lanzamiento &&
            isNaN(Date.parse(lanzamiento))
        ) {
            return res.status(400).json({
                success: false,
                error: 'Fecha de lanzamiento inválida.'
            });
        }

        req.juego = juego;

        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports = { validarActualizarJuego };