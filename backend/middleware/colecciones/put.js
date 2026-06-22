const { JuegoUser } = require('../../models');

const validarActualizarJuego = async (req, res, next) => {
    try {
        const { id_juego } = req.params;
        const id_usuario = req.body.id_usuario || 1;

        const registro = await JuegoUser.findOne({
            where: {
                id_usuario,
                id_juego
            }
        });

        if (!registro) {
            return res.status(404).json({
                success: false,
                error: 'El videojuego no se encuentra en la colección.'
            });
        }

        req.registro = registro;

        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports = { validarActualizarJuego };