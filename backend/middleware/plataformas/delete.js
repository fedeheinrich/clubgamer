const { Plataforma } = require('../../models');

const validarEliminarPlataforma = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                error: 'El ID debe ser un número entero positivo'
            });
        }

        const plataforma = await Plataforma.findByPk(id);

        if (!plataforma) {
            return res.status(404).json({
                success: false,
                error: 'Plataforma no encontrada en la BD'
            });
        }

        req.plataforma = plataforma;

        next();
    } catch (error) {
        console.error('Error al validar eliminación de plataforma:', error);

        return res.status(500).json({
            success: false,
            error: 'Error al validar la eliminación de la plataforma'
        });
    }
};

module.exports = {
    validarEliminarPlataforma
};