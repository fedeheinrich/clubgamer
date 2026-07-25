const { Plataforma } = require('../models');

// ==========================================
//              CONTROLADORES
// ==========================================

// Obtener todas las plataformas
const plataformas = async (req, res) => {
    try {
        const data = await Plataforma.findAll();

        return res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        console.error('Error al obtener plataformas:', error);

        return res.status(500).json({
            success: false,
            error: 'Error al obtener plataformas'
        });
    }
};

// Obtener una plataforma por ID
// El middleware validó el ID, buscó la plataforma
// y la guardó en req.plataforma.
const plataformaPorId = async (req, res) => {
    return res.status(200).json({
        success: true,
        data: req.plataforma
    });
};

// Crear una plataforma
// El middleware validó y normalizó los datos.
const crearPlataforma = async (req, res) => {
    try {
        const { id_rawg, nombre, slug } = req.body;

        const nuevaPlataforma = await Plataforma.create({
            nombre,
            slug: slug ?? null,
            id_rawg: id_rawg ?? null
        });

        return res.status(201).json({
            success: true,
            data: nuevaPlataforma
        });
    } catch (error) {
        console.error('Error al crear plataforma:', error);

        return res.status(500).json({
            success: false,
            error: 'Error al crear plataforma'
        });
    }
};

// Actualizar una plataforma por ID
// El middleware validó los datos, buscó la plataforma
// y la guardó en req.plataforma.
const actualizarPlataforma = async (req, res) => {
    try {
        const { nombre, slug, id_rawg } = req.body;
        const plataforma = req.plataforma;

        if (nombre !== undefined) {
            plataforma.nombre = nombre;
        }

        if (slug !== undefined) {
            plataforma.slug = slug;
        }

        if (id_rawg !== undefined) {
            plataforma.id_rawg = id_rawg;
        }

        await plataforma.save();

        return res.status(200).json({
            success: true,
            data: plataforma
        });
    } catch (error) {
        console.error('Error al editar plataforma:', error);

        return res.status(500).json({
            success: false,
            error: 'Error al editar plataforma'
        });
    }
};

// Eliminar una plataforma por ID
// El middleware validó el ID, buscó la plataforma
// y la guardó en req.plataforma.
const eliminarPlataforma = async (req, res) => {
    try {
        const plataforma = req.plataforma;

        await plataforma.destroy();

        return res.status(200).json({
            success: true,
            mensaje: 'Plataforma eliminada correctamente'
        });
    } catch (error) {
        console.error('Error al eliminar plataforma:', error);

        return res.status(500).json({
            success: false,
            error: 'Error al eliminar plataforma'
        });
    }
};

// ==========================================
//                EXPORTACIÓN
// ==========================================

module.exports = {
    plataformas,
    plataformaPorId,
    crearPlataforma,
    actualizarPlataforma,
    eliminarPlataforma
};