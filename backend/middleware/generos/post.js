const validarCrearGenero = (req, res, next) => {
    const { nombre, slug } = req.body;

    if (!nombre || nombre.trim() === '') {
        return res.status(400).json({
            success: false,
            error: 'El nombre es obligatorio'
        });
    }

    if (!slug || slug.trim() === '') {
        return res.status(400).json({
            success: false,
            error: 'El slug es obligatorio'
        });
    }

    next();
};

module.exports = { validarCrearGenero };