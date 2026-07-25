const { Genero } = require('../../models');

const validarActualizarGenero = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const { nombre, slug, id_rawg } = req.body;

        // Validar ID de la URL
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                error: 'El ID debe ser un número entero positivo'
            });
        }

        // Debe enviarse al menos un campo
        if (
            nombre === undefined &&
            slug === undefined &&
            id_rawg === undefined
        ) {
            return res.status(400).json({
                success: false,
                error: 'Debe enviar al menos un campo para actualizar'
            });
        }

        // Validar nombre
        if (nombre !== undefined) {
            if (typeof nombre !== 'string') {
                return res.status(400).json({
                    success: false,
                    error: 'El nombre debe ser un texto'
                });
            }

            if (nombre.trim() === '') {
                return res.status(400).json({
                    success: false,
                    error: 'El nombre no puede estar vacío'
                });
            }

            req.body.nombre = nombre.trim();
        }

        // Validar slug
        if (slug !== undefined) {
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

            req.body.slug = slug.trim();
        }

        // Validar id_rawg
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

        // Buscar el género
        const genero = await Genero.findByPk(id);

        if (!genero) {
            return res.status(404).json({
                success: false,
                error: 'Género no encontrado'
            });
        }

        req.genero = genero;

        next();
    } catch (error) {
        console.error('Error al validar actualización de género:', error);

        return res.status(500).json({
            success: false,
            error: 'Error al validar la actualización del género'
        });
    }
};

module.exports = {
    validarActualizarGenero
};