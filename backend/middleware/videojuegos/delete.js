const { Juego } = require('../../models');

const validarEliminarJuego = async (req, res, next) => {
    try {
        const { id } = req.params;

        const juego = await Juego.findByPk(id);

        if (!juego) {
            return res.status(404).json({
                success: false,
                error: 'El juego que intenta eliminar no existe.'
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

module.exports = { validarEliminarJuego };