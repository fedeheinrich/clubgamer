const { Genero } = require('../models');

// ==========================================
//              CONTROLADORES
// ==========================================

// Obtener todos los géneros
const generos = async (req, res) => {
    try {
        const data = await Genero.findAll();

        return res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        console.error('Error al obtener géneros:', error);

        return res.status(500).json({
            success: false,
            error: 'Error al obtener géneros'
        });
    }
};

// Obtener género por ID
// El middleware validó el ID, buscó el género
// y lo guardó en req.genero.
const obtenerGeneroPorId = async (req, res) => {
    return res.status(200).json({
        success: true,
        data: req.genero
    });
};

// Crear género
// El middleware validó y normalizó los datos.
const crearGenero = async (req, res) => {
    try {
        const { nombre, slug, id_rawg } = req.body;

        const nuevoGenero = await Genero.create({
            nombre,
            slug,
            id_rawg: id_rawg ?? null
        });

        return res.status(201).json({
            success: true,
            data: nuevoGenero
        });
    } catch (error) {
        console.error('Error al crear género:', error);

        return res.status(500).json({
            success: false,
            error: 'Error al crear género'
        });
    }
};

// Modificar género por ID
// El middleware validó y normalizó los datos,
// buscó el género y lo guardó en req.genero.
const modificarGeneroPorId = async (req, res) => {
    try {
        const { nombre, slug, id_rawg } = req.body;
        const genero = req.genero;

        if (nombre !== undefined) {
            genero.nombre = nombre;
        }

        if (slug !== undefined) {
            genero.slug = slug;
        }

        if (id_rawg !== undefined) {
            genero.id_rawg = id_rawg;
        }

        await genero.save();

        return res.status(200).json({
            success: true,
            data: genero
        });
    } catch (error) {
        console.error('Error al modificar género:', error);

        return res.status(500).json({
            success: false,
            error: 'Error al modificar género'
        });
    }
};

// Eliminar género por ID
// El middleware validó el ID, buscó el género
// y lo guardó en req.genero.
const eliminarGeneroPorId = async (req, res) => {
    try {
        const genero = req.genero;

        await genero.destroy();

        return res.status(200).json({
            success: true,
            mensaje: 'Género eliminado correctamente'
        });
    } catch (error) {
        console.error('Error al eliminar género:', error);

        return res.status(500).json({
            success: false,
            error: 'Error en el servidor, no se pudo eliminar el género'
        });
    }
};

// ==========================================
//                EXPORTACIÓN
// ==========================================

module.exports = {
    generos,
    obtenerGeneroPorId,
    modificarGeneroPorId,
    crearGenero,
    eliminarGeneroPorId
};