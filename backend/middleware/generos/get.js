const { Genero } = require('../../models');

const validarGeneroExiste = async (req, res, next) => {
    try {
        const { id } = req.params;

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

module.exports = { validarGeneroExiste };