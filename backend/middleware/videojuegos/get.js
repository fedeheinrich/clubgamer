const validarIdJuego = (req, res, next) => {
    const { id } = req.params;

    const juegoId = parseInt(id);

    if (isNaN(juegoId) || juegoId <= 0) {
        return res.status(400).json({
            success: false,
            error: 'El ID debe ser un número entero positivo.'
        });
    }

    req.juegoId = juegoId;

    next();
};

module.exports = { validarIdJuego };