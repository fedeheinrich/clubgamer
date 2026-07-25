const validarCrearGenero = (req, res, next) => {
    const { nombre, slug, id_rawg } = req.body;

    // El nombre es obligatorio
    if (nombre === undefined || nombre === null) {
        return res.status(400).json({
            success: false,
            error: 'El nombre del género es obligatorio'
        });
    }

    // El nombre debe ser texto
    if (typeof nombre !== 'string') {
        return res.status(400).json({
            success: false,
            error: 'El nombre debe ser un texto'
        });
    }

    // El nombre no puede estar vacío
    if (nombre.trim() === '') {
        return res.status(400).json({
            success: false,
            error: 'El nombre del género no puede estar vacío'
        });
    }

    // El slug es obligatorio
    if (slug === undefined || slug === null) {
        return res.status(400).json({
            success: false,
            error: 'El slug del género es obligatorio'
        });
    }

    // El slug debe ser texto
    if (typeof slug !== 'string') {
        return res.status(400).json({
            success: false,
            error: 'El slug debe ser un texto'
        });
    }

    // El slug no puede estar vacío
    if (slug.trim() === '') {
        return res.status(400).json({
            success: false,
            error: 'El slug del género no puede estar vacío'
        });
    }

    // id_rawg es opcional, pero si viene debe ser entero positivo
    if (id_rawg !== undefined && id_rawg !== null) {
        const idRawgNumero = Number(id_rawg);

        if (!Number.isInteger(idRawgNumero) || idRawgNumero <= 0) {
            return res.status(400).json({
                success: false,
                error: 'El id_rawg debe ser un número entero positivo'
            });
        }

        req.body.id_rawg = idRawgNumero;
    }

    // Normalización de textos
    req.body.nombre = nombre.trim();
    req.body.slug = slug.trim();

    next();
};

module.exports = {
    validarCrearGenero
};