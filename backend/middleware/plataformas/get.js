const { Plataforma } = require('../../models');

const validarObtenerPlataforma = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        mensaje: 'El ID de la plataforma debe ser un número entero positivo'
      });
    }

    const plataforma = await Plataforma.findByPk(id);

    if (!plataforma) {
      return res.status(404).json({
        success: false,
        mensaje: 'Plataforma no encontrada'
      });
    }

    req.plataforma = plataforma;
    next();
  } catch (error) {
    console.error('Error al validar plataforma:', error);

    return res.status(500).json({
      success: false,
      mensaje: 'Error interno del servidor'
    });
  }
};

module.exports = {
  validarObtenerPlataforma
};