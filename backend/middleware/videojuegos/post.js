const validarCrearJuego = (req, res, next) => {
    const {
        id_rawg,
        titulo,
        calificacion_global,
        lanzamiento,
        url_imagen,
        slug,
        generos,
        plataformas
    } = req.body;

    // Validar título
    if (
        !titulo ||
        typeof titulo !== 'string' ||
        titulo.trim() === ''
    ) {
        return res.status(400).json({
            success: false,
            error: "El campo 'titulo' es obligatorio."
        });
    }

    // Validar slug
    if (
        !slug ||
        typeof slug !== 'string' ||
        slug.trim() === ''
    ) {
        return res.status(400).json({
            success: false,
            error: "El campo 'slug' es obligatorio."
        });
    }

    // Validar id_rawg si fue enviado
    if (id_rawg !== undefined && id_rawg !== null) {
        const idRawgNumero = Number(id_rawg);

        if (!Number.isInteger(idRawgNumero) || idRawgNumero <= 0) {
            return res.status(400).json({
                success: false,
                error: "El campo 'id_rawg' debe ser un número entero positivo."
            });
        }

        req.body.id_rawg = idRawgNumero;
    }

    // Validar calificación global si fue enviada
    if (
        calificacion_global !== undefined &&
        calificacion_global !== null
    ) {
        const calificacionNumero = Number(calificacion_global);

        if (
            Number.isNaN(calificacionNumero) ||
            calificacionNumero < 0 ||
            calificacionNumero > 5
        ) {
            return res.status(400).json({
                success: false,
                error: "La 'calificacion_global' debe ser un número entre 0 y 5."
            });
        }

        req.body.calificacion_global = calificacionNumero;
    }

    // Validar fecha de lanzamiento si fue enviada
    if (
        lanzamiento !== undefined &&
        lanzamiento !== null &&
        lanzamiento !== ''
    ) {
        if (Number.isNaN(Date.parse(lanzamiento))) {
            return res.status(400).json({
                success: false,
                error: "El campo 'lanzamiento' debe ser una fecha válida (YYYY-MM-DD)."
            });
        }
    }

    // Validar URL de imagen solamente si fue enviada
    if (
        url_imagen !== undefined &&
        url_imagen !== null &&
        url_imagen !== ''
    ) {
        if (
            typeof url_imagen !== 'string' ||
            url_imagen.trim() === ''
        ) {
            return res.status(400).json({
                success: false,
                error: "El campo 'url_imagen' debe ser una cadena válida."
            });
        }

        try {
            new URL(url_imagen.trim());
        } catch {
            return res.status(400).json({
                success: false,
                error: "El campo 'url_imagen' debe contener una URL válida."
            });
        }

        req.body.url_imagen = url_imagen.trim();
    }

    // Validar géneros si fueron enviados
    if (generos !== undefined) {
        if (!Array.isArray(generos)) {
            return res.status(400).json({
                success: false,
                error: "El campo 'generos' debe ser un array."
            });
        }

        const generosValidos = generos.every(
            idGenero =>
                Number.isInteger(Number(idGenero)) &&
                Number(idGenero) > 0
        );

        if (!generosValidos) {
            return res.status(400).json({
                success: false,
                error: "Todos los elementos de 'generos' deben ser IDs enteros positivos."
            });
        }

        req.body.generos = generos.map(Number);
    }

    // Validar plataformas si fueron enviadas
    if (plataformas !== undefined) {
        if (!Array.isArray(plataformas)) {
            return res.status(400).json({
                success: false,
                error: "El campo 'plataformas' debe ser un array."
            });
        }

        const plataformasValidas = plataformas.every(
            idPlataforma =>
                Number.isInteger(Number(idPlataforma)) &&
                Number(idPlataforma) > 0
        );

        if (!plataformasValidas) {
            return res.status(400).json({
                success: false,
                error: "Todos los elementos de 'plataformas' deben ser IDs enteros positivos."
            });
        }

        req.body.plataformas = plataformas.map(Number);
    }

    // Normalizar textos obligatorios
    req.body.titulo = titulo.trim();
    req.body.slug = slug.trim();

    next();
};

module.exports = {
    validarCrearJuego
};