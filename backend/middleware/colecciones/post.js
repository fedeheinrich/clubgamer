const { JuegoUser } = require('../../models');

const validarAgregarJuego = async (req, res, next) => {
    try {
        const { id_juego } = req.body;
        const id_usuario = req.body.id_usuario || 1;

        if (!id_juego) {
            return res.status(400).json({
                success: false,
                error: 'El campo id_juego es obligatorio.'
            });
        }

        const existe = await JuegoUser.findOne({
            where: {
                id_usuario,
                id_juego
            }
        });

        if (existe) {
            return res.status(409).json({
                success: false,
                error: 'Este juego ya figura en tu colección.'
            });
        }

        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports = { validarAgregarJuego };