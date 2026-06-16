const { Genero } = require('../models');

// ==========================================
//              CONTROLADORES
// ==========================================

// Obtener todos los géneros
const generos = async (req, res) => {
    try {
         const data = await Genero.findAll();
         return res.status(200).json({success: true, data});
    } catch (error) {
        console.error('Error al obtener géneros', error);
        return res.status(500).json({success: false, error: 'Error al obtener géneros'});
    }
};

// Obtener genero por ID
const obtenerGeneroPorId = async (req, res) => {
    try {
        const { id } = req.params;
        
        const genero = await Genero.findByPk(id);
        if (!genero) {
            return res.status(404).json({success: false, error: 'Género no encontrado'});
        }
        return res.status(200).json({success: true, data: genero});
    } catch (error) {
        console.error('Error en el servidor', error);
        return res.status(500).json({success: false, error: 'Error en el servidor'});
    }
};

// Modificar genero por ID
const modificarGeneroPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre: nombreRecibido, slug: slugRecibido, id_rawg: id_rawgRecibido } = req.body;

        // Validacion: no permite texto vacio
        if (nombreRecibido !== undefined && nombreRecibido.trim() === '') {
            return res.status(400).json({success: false, error: 'El nombre no puede estar vacío ni ser puros espacios'});
        }
        if (slugRecibido !== undefined && slugRecibido.trim() === '') {
            return res.status(400).json({success: false, error: 'El slug no puede estar vacío ni ser puros espacios'});
        }
        const generoBd = await Genero.findByPk(id);
        if (!generoBd) {
            return res.status(404).json({success: false, error: 'Género no encontrado'});
        }

        generoBd.nombre = nombreRecibido ? nombreRecibido.trim() : generoBd.nombre;
        generoBd.slug = slugRecibido ? slugRecibido.trim() : generoBd.slug;
        generoBd.id_rawg = id_rawgRecibido !== undefined ? id_rawgRecibido : generoBd.id_rawg;
        await generoBd.save();

        return res.status(200).json({success: true, data: generoBd});
    } catch (error) {
        console.error('Error en el servidor', error);
        return res.status(500).json({success: false, error: 'Error en el servidor'});
    }
};

// Crear genero
const crearGenero = async (req, res) => {
    try {
        const { nombre, slug, id_rawg } = req.body;
        // Validacion: no permite texto vacio
        if (!nombre || nombre.trim() === '' || !slug || slug.trim() === '') {
            return res.status(400).json({ success: false, error: 'El nombre y el slug son obligatorios y no pueden estar vacíos' });
        }
        
        const nuevoGenero = await Genero.create({ nombre: nombre.trim(), slug: slug.trim(), id_rawg: id_rawg ? id_rawg : null });
        return res.status(201).json({success: true, data: nuevoGenero});
    } catch (error) {
        console.error('Error al crear género', error);
        return res.status(500).json({ success: false, error: 'Error al crear género' });
    }
}

// Eliminar genero por ID
const eliminarGeneroPorId = async (req, res) => {
    try {
        const { id } = req.params;
       
        const genero = await Genero.findByPk(id);
        if (!genero) {
            return res.status(404).json({success: false, error: 'Género no encontrado'});
        }
        await genero.destroy();
        return res.status(200).json({success: true, mensaje: 'Género eliminado correctamente'});
    }
   catch (error) {
        console.error('Error en el servidor, no se pudo eliminar el género', error);
        return res.status(500).json({success: false, error: 'Error en el servidor, no se pudo eliminar el género'});
   }

};


module.exports = { generos, obtenerGeneroPorId, modificarGeneroPorId, crearGenero, eliminarGeneroPorId }