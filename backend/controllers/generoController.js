// ==========================================
// 1. BASE DE DATOS REAL (Descomentar después)
// ==========================================
// const { Genero } = require('../models');

// ==========================================
// 2. MOCK / BD FALSA (Borrar después)
// ==========================================
let generosMock = [
    { id: 1, id_rawg:4, nombre: 'Acción', slug: 'accion' },
    { id: 3, id_rawg:5, nombre: 'Aventura', slug: 'aventura' },
    { id: 2, id_rawg:51, nombre: 'Indie', slug: 'indie' },
    { id: 4, id_rawg:6, nombre: 'RPG', slug: 'rpg' }
]

// ==========================================
// 3. CONTROLADORES
// ==========================================

// Obtener todos los géneros
const generos = async (req, res) => {
    try {
        // BD REAL (Comentado por ahora):
        // const data = await Genero.findAll();
        // return res.status(200).json(data);
        // Por ahora, devuelvo la base de datos falsa (mock) para pruebas
        return res.status(200).json(generosMock);
    } catch (error) {
        console.error('Error al obtener géneros', error);
        return res.status(500).json({error: 'Error al obtener géneros'});
    }
};

// Obtener genero por ID
const obtenerGeneroPorId = async (req, res) => {
    try {
        const { id } = req.params;
        // BD REAL (Comentado por ahora):
        // const genero = await Genero.findByPk(id);
        // if (!genero) {
        //     return res.status(404).json({error: 'Género no encontrado'});
        // }
        // return res.status(200).json(genero);

        // Por ahora, busco el género en la base de datos falsa (mock) para pruebas
        const genero = generosMock.find(iteradorGenero => iteradorGenero.id === parseInt(id));
        if (!genero) {
            return res.status(404).json({error: 'Género no encontrado'});
        }
        return res.status(200).json(genero);
    } catch (error) {
        console.error('Error en el servidor', error);
        return res.status(500).json({error: 'Error en el servidor'});
    }
 
};

// Modificar genero por ID
const modificarGeneroPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre: nombreRecibido, slug: slugRecibido, id_rawg: id_rawgRecibido } = req.body;

        // Validacion: no permite texto vacio
        if (nombreRecibido !== undefined && nombreRecibido.trim() === '') {
            return res.status(400).json({error: 'El nombre no puede estar vacío ni ser puros espacios'});
        }
        if (slugRecibido !== undefined && slugRecibido.trim() === '') {
            return res.status(400).json({error: 'El slug no puede estar vacío ni ser puros espacios'});
        }

        // BD REAL (Comentado por ahora):
        // const generoBd = await Genero.findByPk(id);
        // if (!generoBd) {
        //     return res.status(404).json({error: 'Género no encontrado'});
        // }
        // generoBd.nombre = nombreRecibido ? nombreRecibido.trim() : generoBd.nombre;
        // generoBd.slug = slugRecibido ? slugRecibido.trim() : generoBd.slug;
        // generoBd.id_rawg = id_rawgRecibido !== undefined ? id_rawgRecibido : generoBd.id_rawg;
        // await generoBd.save();
        // return res.status(200).json(generoBd);

        // Por ahora, busco el género en la base de datos falsa (mock) para pruebas
        const genero = generosMock.find(iteradorGenero => iteradorGenero.id === parseInt(id));
        if (!genero) {
            return res.status(404).json({error: 'Género no encontrado'});
        }
        genero.nombre = nombreRecibido ? nombreRecibido.trim() : genero.nombre;
        genero.slug = slugRecibido ? slugRecibido.trim() : genero.slug;
        genero.id_rawg = id_rawgRecibido !== undefined ? id_rawgRecibido : genero.id_rawg;
        return res.status(200).json(genero);
    } catch (error) {
        console.error('Error en el servidor', error);
        return res.status(500).json({error: 'Error en el servidor'});

    }
};

// Crear genero
const crearGenero = async (req, res) => {
    try {
        const { nombre, slug, id_rawg } = req.body;
        // Validacion: no permite texto vacio
        if (!nombre || nombre.trim() === '' || !slug || slug.trim() === '') {
            return res.status(400).json({ error: 'El nombre y el slug son obligatorios y no pueden estar vacíos' });
        }
        // BD REAL (Comentado por ahora):
        // const nuevoGenero = await Genero.create({ nombre: nombre.trim(), slug: slug.trim(), id_rawg: id_rawg ? id_rawg : null });
        // return res.status(201).json(nuevoGenero);

        // Por ahora, creo el género en la base de datos falsa (mock) para pruebas
        const nuevoGenero = {
            id: generosMock.length > 0 ? Math.max(...generosMock.map(g => g.id)) + 1 : 1, // Genera un ID incremental
            id_rawg: id_rawg ? id_rawg : null, // Si se proporciona id_rawg, lo asigna; de lo contrario, lo deja como null
            nombre: nombre.trim(),
            slug: slug.trim()
        };
        generosMock.push(nuevoGenero);
        return res.status(201).json(nuevoGenero);
    } catch (error) {
        console.error('Error al crear género', error);
        return res.status(500).json({ error: 'Error al crear género' });
    }
}

// Eliminar genero por ID
const eliminarGeneroPorId = async (req, res) => {
    try {
        const { id } = req.params;
        // BD REAL (Comentado por ahora):
        // const genero = await Genero.findByPk(id);
        // if (!genero) {
        //     return res.status(404).json({error: 'Género no encontrado'});
        // }
        // await genero.destroy();
        // return res.status(200).json({message: 'Género eliminado correctamente'});

        // Por ahora, elimino el género en la base de datos falsa (mock) para pruebas
        const indice = generosMock.findIndex(iteradorGenero => iteradorGenero.id === parseInt(id));
        if ( indice === -1) {
            return res.status(404).json({error: 'No se encontró el género para eliminar'});
        }
        generosMock.splice(indice, 1);
        return res.status(204).send();
    }
   catch (error) {
        console.error('Error en el servidor, no se pudo eliminar el género', error);
        return res.status(500).json({error: 'Error en el servidor, no se pudo eliminar el género'});
   }

};


module.exports = { generos, obtenerGeneroPorId, modificarGeneroPorId, crearGenero, eliminarGeneroPorId }