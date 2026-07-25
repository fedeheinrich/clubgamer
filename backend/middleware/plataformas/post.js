const validarCrearPlataforma = (req, res, next) => {
    const { id_rawg, nombre, slug } = req.body;

    // El nombre es obligatorio
    if (nombre === undefined || nombre === null) {
        return res.status(400).json({
            success: false,
            error: 'El nombre de la plataforma es requerido'
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
            error: 'El nombre de la plataforma es requerido'
        });
    }

    // El slug es opcional, pero si viene debe ser texto
    if (slug !== undefined && slug !== null) {
        if (typeof slug !== 'string') {
            return res.status(400).json({
                success: false,
                error: 'El slug debe ser un texto'
            });
        }

        if (slug.trim() === '') {
            return res.status(400).json({
                success: false,
                error: 'El slug no puede estar vacío'
            });
        }
    }

    // id_rawg es opcional, pero si viene debe ser un entero positivo
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

    // Normalizamos los textos antes de llegar al controller
    req.body.nombre = nombre.trim();

    if (slug !== undefined && slug !== null) {
        req.body.slug = slug.trim();
    }

    next();
};

module.exports = {
    validarCrearPlataforma
};