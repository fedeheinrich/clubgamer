const { Plataforma } = require('../../models');

const validarActualizarPlataforma = async (req, res, next) => {
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

module.exports = { validarActualizarPlataforma };