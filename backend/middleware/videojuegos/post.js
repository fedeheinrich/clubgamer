const validarCrearJuego = (req, res, next) => {
    const {
        titulo,
        slug,
        calificacion_global,
        lanzamiento
    } = req.body;

    if (!titulo || titulo.trim() === '') {
        return res.status(400).json({
            success: false,
            error: "El campo 'titulo' es obligatorio."
        });
    }

    if (!slug || slug.trim() === '') {
        return res.status(400).json({
            success: false,
            error: "El campo 'slug' es obligatorio."
        });
    }

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
            error: "La calificación debe estar entre 0 y 5."
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

    next();
};

module.exports = { validarCrearJuego };