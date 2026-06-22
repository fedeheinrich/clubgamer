const { Genero } = require('../../models');

const validarModificarGenero = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nombre, slug } = req.body;

        if (nombre !== undefined && nombre.trim() === '') {
            return res.status(400).json({
                success: false,
                error: 'El nombre no puede estar vacío'
            });
        }

        if (slug !== undefined && slug.trim() === '') {
            return res.status(400).json({
                success: false,
                error: 'El slug no puede estar vacío'
            });
        }

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
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports = { validarModificarGenero };