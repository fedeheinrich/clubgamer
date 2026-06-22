const { Plataforma } = require('../../models');

const validarEliminarPlataforma = async (req, res, next) => {
    try {
        const { id } = req.params;

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
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports = { validarEliminarPlataforma };