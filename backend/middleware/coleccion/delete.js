const { JuegoUser } = require('../../models');

const validarEliminarJuegoColeccion = async (req, res, next) => {
    try {
        const { id_juego } = req.params;
        const id_usuario = req.user.id;

        const idJuegoNumero = Number(id_juego);

        if (
            !Number.isInteger(idJuegoNumero) ||
            idJuegoNumero <= 0
        ) {
            return res.status(400).json({
                success: false,
                error: "El parámetro id_juego debe ser un número entero positivo."
            });
        }

        const registro = await JuegoUser.findOne({
            where: {
                id_usuario,
                id_juego: idJuegoNumero
            }
        });

        if (!registro) {
            return res.status(404).json({
                success: false,
                error: "El juego no estaba en tu colección."
            });
        }

        req.params.id_juego = idJuegoNumero;
        req.registroColeccion = registro;

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Error interno al validar la eliminación del juego de la colección.",
            detalle: error.message
        });
    }
};

module.exports = {
    validarEliminarJuegoColeccion
};