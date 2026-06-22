const validarCrearPlataforma = (req, res, next) => {
    const { nombre, slug } = req.body;

    if (!nombre || nombre.trim() === '') {
        return res.status(400).json({
            success: false,
            error: 'El nombre de la plataforma es requerido'
        });
    }

    if (slug !== undefined && slug.trim() === '') {
        return res.status(400).json({
            success: false,
            error: 'El slug no puede estar vacío'
        });
    }

    next();
};

module.exports = { validarCrearPlataforma };