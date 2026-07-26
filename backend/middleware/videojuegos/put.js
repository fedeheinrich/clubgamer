const { Juego } = require('../../models');

const validarActualizarJuego = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        const {
            titulo,
            calificacion_global,
            lanzamiento,
            url_imagen,
            slug,
            generos,
            plataformas
        } = req.body;

        // Validar ID de la URL
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                error: 'El ID debe ser un número entero positivo.'
            });
        }

        // Debe enviarse al menos un campo
        if (
            titulo === undefined &&
            calificacion_global === undefined &&
            lanzamiento === undefined &&
            url_imagen === undefined &&
            slug === undefined &&
            generos === undefined &&
            plataformas === undefined
        ) {
            return res.status(400).json({
                success: false,
                error: 'Debe enviar al menos un campo para actualizar.'
            });
        }

        // Validar título si fue enviado
        if (titulo !== undefined) {
            if (
                typeof titulo !== 'string' ||
                titulo.trim() === ''
            ) {
                return res.status(400).json({
                    success: false,
                    error: "El campo 'titulo' debe ser un texto no vacío."
                });
            }

            req.body.titulo = titulo.trim();
        }

        // Validar slug si fue enviado
        if (slug !== undefined) {
            if (
                typeof slug !== 'string' ||
                slug.trim() === ''
            ) {
                return res.status(400).json({
                    success: false,
                    error: "El campo 'slug' debe ser un texto no vacío."
                });
            }

            req.body.slug = slug.trim();
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
                    error: "La 'calificacion_global' debe ser un float entre 0 y 5."
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
                    error: "El 'lanzamiento' debe ser una fecha válida."
                });
            }
        }

        // Validar URL de imagen si fue enviada
        if (url_imagen !== undefined) {
            if (
                typeof url_imagen !== 'string' ||
                url_imagen.trim() === ''
            ) {
                return res.status(400).json({
                    success: false,
                    error: "El campo 'url_imagen' debe ser un texto no vacío."
                });
            }

            try {
                new URL(url_imagen);
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

        // Buscar juego local
        const juego = await Juego.findByPk(id);

        if (!juego) {
            return res.status(404).json({
                success: false,
                error: 'Juego no encontrado'
            });
        }

        req.params.id = id;
        req.juego = juego;

        next();
    } catch (error) {
        console.error('Error al validar actualización del juego:', error);

        return res.status(500).json({
            success: false,
            error: 'Error al validar la actualización del juego.'
        });
    }
};

module.exports = {
    validarActualizarJuego
};