const validarObtenerJuego = (req, res, next) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            success: false,
            error: 'El ID provisto en la URL debe ser un número entero positivo.'
        });
    }

    // Normalizamos el parámetro para que el controlador reciba un número válido.
    req.params.id = id;

    next();
};

module.exports = {
    validarObtenerJuego
};