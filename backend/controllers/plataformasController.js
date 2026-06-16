const { Plataforma } = require('../models');

// ==========================================
//             CONTROLADORES
// ==========================================

// Obtener todas las plataformas
const plataformas = async (req, res) => {
    try {
        const data = await Plataforma.findAll();
        return res.status(200).json({success: true, data});
    } catch (error) {
        console.error('Error al obtener plataformas', error);
        return res.status(500).json({success: false, error: 'Error al obtener plataformas'});
    }
};

// Obtener una plataforma por ID
const plataformaPorId = async (req, res) => {
    try{
        const { id } = req.params;
        
        const plataforma = await Plataforma.findByPk(id);
        if (!plataforma) {
           return res.status(404).json({ success: false, error: 'Plataforma no encontrada en la BD' });
         }
        return res.status(200).json({success: true, data: plataforma});

    } catch (error) {
        console.error('Error al obtener plataforma por ID', error);
        return res.status(500).json({success: false, error: 'Error al obtener plataforma por ID'});
    }
}

// Crear una plataforma
const crearPlataforma = async (req, res) => {
    try {
        const { id_rawg, nombre, slug } = req.body;
        // Validacion: no permite texto vacio
        if (!nombre || nombre.trim() === '') {
            return res.status(400).json({success: false, error: 'El nombre de la plataforma es requerido'});
        }
        if (slug !== undefined && slug.trim() === '') {
            return res.status(400).json({success: false, error: 'El slug no puede estar vacío'});
        }
        
        // En la BD real, Sequelize se encarga de crear el ID solo.
        const nuevaPlataforma = await Plataforma.create({ 
        nombre: nombre.trim(), 
        slug: slug? slug.trim() : null, 
        id_rawg: id_rawg ? parseInt(id_rawg) : null });
        return res.status(201).json({success: true, data: nuevaPlataforma});
    }catch (error) {
        console.error('Error al crear plataforma', error);
        return res.status(500).json({success: false, error: 'Error al crear plataforma'});
    }
}

// Actualizar nombre de una plataforma buscando por id
const actualizarPlataforma = async (req, res) => {
    try{
        const { id } = req.params;
        const { nombre, slug, id_rawg } = req.body; // Obtengo el nombre nuevo desde el cuerpo de la solicitud (req.body)
        // Validacionnes: no permite textos vacios
        if (nombre !== undefined && nombre.trim() === '') {
            return res.status(400).json({success: false, error: 'El nombre no puede estar vacío'});
        }
        if (slug !== undefined && slug.trim() === '') {
            return res.status(400).json({success: false, error: 'El slug no puede estar vacío'});
        }
        
        // Busco la plataforma por id en la base de datos
        const plataformaBd = await Plataforma.findByPk(id);
        if (!plataformaBd) {
        return res.status(404).json({success: false, error: 'Plataforma no encontrada en la BD' });
        }
         // Actualizo el nombre de la plataforma y guardo los cambios en la base de datos
         if (nombre && nombre.trim() !== '') plataformaBd.nombre = nombre.trim();
         if (slug && slug.trim() !== '') plataformaBd.slug = slug.trim();
         if (id_rawg !== undefined) plataformaBd.id_rawg = id_rawg;
         // Guardo el cambio en la base de datos
         await plataformaBd.save();
         // respondo con la plataforma actualizada
         return res.status(200).json({success: true, data: plataformaBd});
    }catch (error) {
        console.error('Error al editar plataforma', error);
        return res.status(500).json({success: false, error: 'Error al editar plataforma'});
    }
}

// Eliminar una plataforma por id
const eliminarPlataforma = async (req, res)=> {
    try{
        const { id } = req.params;
        
         const plataforma = await Plataforma.findByPk(id);
         if (!plataforma) {
           return res.status(404).json({ success: false, error: 'Plataforma no encontrada en la BD' });
         }
         await plataforma.destroy();
         return res.status(200).json({success: true, mensaje: 'Plataforma eliminada correctamente'});
    } catch (error) {
        console.error('Error al eliminar plataforma', error);
        return res.status(500).json({success: false, error: 'Error al eliminar plataforma'});
    }
}

// ==========================================
//               EXPORTACIÓN
// ==========================================
module.exports = {plataformas, plataformaPorId, crearPlataforma, actualizarPlataforma, eliminarPlataforma};

