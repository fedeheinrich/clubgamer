// ==========================================
// 1. BASE DE DATOS REAL (Descomentar después)
// ==========================================
// const { Plataforma } = require('../models');


// ==========================================
// 2. MOCK / BD FALSA (Borrar después)
// ==========================================
let plataformasMock = [
  { id: 1, id_rawg: 4, nombre: 'PC', slug: 'pc' },
  { id: 2, id_rawg: 18, nombre: 'PlayStation 4', slug: 'playstation4' },
  { id: 3, id_rawg: 187, nombre: 'PlayStation 5', slug: 'playstation5' },
  { id: 4, id_rawg: 1, nombre: 'Xbox One', slug: 'xbox-one' },
  { id: 5, id_rawg: 186, nombre: 'Xbox Series S/X', slug: 'xbox-series-s-x' },
  { id: 6, id_rawg: 7, nombre: 'Nintendo Switch', slug: 'nintendo-switch' }
];


// ==========================================
// 3. CONTROLADORES
// ==========================================


// Obtener todas las plataformas
const plataformas = async (req, res) => {
    try {
        // BD REAL (Comentado por ahora):
        // const data = await Plataforma.findAll();
        // return res.status(200).json(data);
        
        // Por ahora, devuelvo la base de datos falsa (mock) para pruebas
        res.status(200).json(plataformasMock);
    } catch (error) {
        console.error('Error al obtener plataformas', error);
        res.status(500).json({error: 'Error al obtener plataformas'});
    }
};

// Obtener una plataforma por ID
const plataformaPorId = async (req, res) => {
    try{
        const { id } = req.params;
        // BD REAL (Comentado por ahora):
        // const plataforma = await Plataforma.findByPk(id);
        // if (!plataforma) {
        //   return res.status(404).json({ error: 'Plataforma no encontrada en la BD' });
        // }
        // return res.status(200).json(plataforma);

        // Por ahora, busco la plataforma en la base de datos falsa (mock) para pruebas
        const plataforma = plataformasMock.find(i => i.id === parseInt(id));
        if (!plataforma) {
            return res.status(404).json({error: 'Plataforma no encontrada'});
        }
        return res.status(200).json(plataforma);
    } catch (error) {
        console.error('Error al obtener plataforma por ID', error);
        return res.status(500).json({error: 'Error al obtener plataforma por ID'});
    }
}

// Crear una plataforma
const crearPlataforma = async (req, res) => {
    try {
        const { id_rawg, nombre, slug } = req.body;
        // Validacion: no permite texto vacio
        if (!nombre || nombre.trim() === '') {
            return res.status(400).json({error: 'El nombre de la plataforma es requerido'});
        }
        // BD REAL (Comentado por ahora):
        // En la BD real, Sequelize se encarga de crear el ID solo.
        // const nuevaPlataforma = await Plataforma.create({ 
        // nombre: nombre.trim(), 
        // slug: slug? slug.trim() : null, 
        // id_rawg: id_rawg ? parseInt(id_rawg) : null });
        // return res.status(201).json(nuevaPlataforma);

        // Mock: al no haber BD, creo un id de mentira sumando 1 al id mas alto del mock
        const nuevoId = Math.max(...plataformasMock.map(i => i.id)) +1;
        const nuevaPlataforma = { 
            id: nuevoId, 
            nombre: nombre.trim(), 
            slug: slug ? slug.trim() : null, 
            id_rawg: id_rawg ? parseInt(id_rawg) : null };
        plataformasMock.push(nuevaPlataforma);
        return res.status(201).json(nuevaPlataforma);

    }catch (error) {
        console.error('Error al crear plataforma', error);
        return res.status(500).json({error: 'Error al crear plataforma'});
    }
}

// Actualizar nombre de una plataforma buscando por id
const actualizarPlataforma = async (req, res) => {
    try{
        const { id } = req.params;
        const { nombre, slug, id_rawg } = req.body; // Obtengo el nombre nuevo desde el cuerpo de la solicitud (req.body)
        // Validacion: no permite texto vacio
        if (!nombre || nombre.trim() === '') {
            return res.status(400).json({error: 'El nombre de la plataforma es requerido'});
        }
        // BD REAL (Comentado por ahora):
        // Busco la plataforma por id en la base de datos
        // const plataforma = await Plataforma.findByPk(id);
        // if (!plataforma) {
        //   return res.status(404).json({ error: 'Plataforma no encontrada en la BD' });
        // }
        // Actualizo el nombre de la plataforma y guardo los cambios en la base de datos
        // if (nombre && nombre.trim() !== '') plataformaBd.nombre = nombre.trim();
        // if (slug && slug.trim() !== '') plataformaBd.slug = slug.trim();
        // if (id_rawg !== undefined) plataformaBd.id_rawg = id_rawg;
        // Guardo el cambio en la base de datos
        // await plataforma.save();
        // respondo con la plataforma actualizada
        // return res.status(200).json(plataforma);

        // Por ahora, busco la plataforma en la base de datos falsa (mock) para pruebas
        const plataforma = plataformasMock.find( i => i.id === parseInt(id));
        // Si no la encuentro, respondo con error 404
        if (!plataforma) {
            return res.status(404).json({error: 'Plataforma no encontrada'});
        }
        // Actualizo el nombre de la plataforma
        plataforma.nombre = nombre.trim();
        plataforma.slug = slug ? slug.trim() : plataforma.slug;
        plataforma.id_rawg = id_rawg ? parseInt(id_rawg) : plataforma.id_rawg;
        // Devuelvo la plataforma actualizada
        return res.status(200).json(plataforma);
    }catch (error) {
        console.error('Error al editar plataforma', error);
        return res.status(500).json({error: 'Error al editar plataforma'});
    }
}


// Eliminar una plataforma por id
const eliminarPlataforma = async (req, res)=> {
    try{
        const { id } = req.params;
        // BD REAL (Comentado por ahora):
        // const plataforma = await Plataforma.findByPk(id);
        // if (!plataforma) {
        //   return res.status(404).json({ error: 'Plataforma no encontrada en la BD' });
        // }
        // await plataforma.destroy();
        // return res.status(204).send();
        // Por ahora, busco la plataforma en la base de datos falsa (mock) para pruebas
        const index = plataformasMock.findIndex( i => i.id === parseInt(id));
        // Si no la encuentro, respondo con error 404
        if (index === -1) {
            return res.status(404).json({error: 'Plataforma no encontrada'});
        }
        // Elimino la plataforma del array mock usando splice
        plataformasMock.splice(index, 1);
        // Devuelvo una respuesta sin contenido (204)
        return res.status(204).send();

    } catch (error) {
        console.error('Error al eliminar plataforma', error);
        return res.status(500).json({error: 'Error al eliminar plataforma'});
    }
}

// ==========================================
// 4. EXPORTACIÓN
// ==========================================
module.exports = {plataformas, plataformaPorId, crearPlataforma, actualizarPlataforma, eliminarPlataforma};

