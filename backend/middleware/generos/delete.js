const { Genero } = require('../../models');

const validarEliminarGenero = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                error: 'El ID debe ser un número entero positivo'
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
        console.error('Error al validar eliminación de género:', error);

        return res.status(500).json({
            success: false,
            error: 'Error al validar la eliminación del género'
        });
    }
};

module.exports = {
    validarEliminarGenero
};