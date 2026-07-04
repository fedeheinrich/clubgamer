const { Juego, Genero, Plataforma } = require('../models');
const { obtenerJuego } = require('../utils/rawgHelper');

const videojuegosController = {

    obtenerJuegoPorId: async (req, res) => {
       try{
          const { id } = req.params;
          const juegoId = parseInt(id);

           // Validación del ID del juego en la URL
          if (isNaN(juegoId) || juegoId <= 0) {
            return res.status(400).json({ success: false, error: "El ID provisto en la URL debe ser un número entero positivo." });
          }

          // Uso el helper
          const juego = await obtenerJuego(juegoId);

          return res.status(200).json({success: true, data: juego});
        } catch (error) { 
            // Si el helper tiro error es porque RAWG le devolvio un 404
            if (error.response && error.response.status === 404){
                return res.status(404).json({success:false, error: "El juego no existe en la base de datos local ni en la API RAWG."});
            }
            // Error de red
            return res.status(500).json({success: false, error: "Error de conexion o servidor.", detalle: error.message});
        } 
    },

    obtenerTodosLosJuegos: async (req, res) => {
        try{
            // Trae todos los juegos de la BD
            const juegos  = await Juego.findAll({
                include: [
                    { model: Genero, attributes: ['id', 'nombre','slug'], through: { attributes: [] } }, 
                    { model: Plataforma, attributes: ['id', 'nombre','slug'], through: { attributes: [] } } 
                ]
            });

            return res.status(200).json({success: true, data: juegos});
        } catch (error) {
            return res.status(500).json({success: false, error:"Error al recuperar el catalogo de Juegos.", detalle: error.message});
        }   
    },

    crearJuego: async (req, res) => {
        try{
            const { id_rawg, titulo, calificacion_global, lanzamiento, url_imagen, slug } = req.body;
            // Correcion, el id lo genera Sequelize de forma incremental
            // Validación de título
            if (!titulo || typeof titulo !== 'string' || titulo.trim() === '') {
                return res.status(400).json({ success: false, error: "El campo 'titulo' es obligatorio."});
            }
            if (!slug || slug.trim()===''){
                return res.status(400).json({success: false, error: "El campo slug es obligatorio."});
            }
            // Validación de calificación, si se proporciona
            // Se corrigio el nombre de la variable y a parseFloat ya que RAWG retorna valores FLOAT para la calificacion
            if (calificacion_global !== undefined && (isNaN(parseFloat(calificacion_global)) || calificacion_global < 0 || calificacion_global > 5)) {
                return res.status(400).json({ success: false, error: "La 'calificacion_global' debe ser un float entre 0 y 5."});
            }
            // Validación de fecha de lanzamiento, si se proporciona
            if (lanzamiento && isNaN(Date.parse(lanzamiento))) {
                return res.status(400).json({ success: false, error: "El campo lanzamiento debe ser una fecha válida (YYYY-MM-DD)."});
            }

            const nuevoJuego = await Juego.create({
                id_rawg: id_rawg || null,
                titulo: titulo.trim(),
                slug: slug.trim(),
                lanzamiento,
                url_imagen,
                calificacion_global: calificacion_global || 0
             });
            
            return res.status(201).json({ success: true, mensaje: "Juego creado localmente", data: nuevoJuego });

            } catch (error) {
                if (error.name === 'SequelizeUniqueConstraintError'){
                    return res.status(409).json({success: false, error: "El ID de RAWG o el Slug de este juego ya estan registrados."})
                }
                return res.status(500).json({success:false, error: "Error al intentar crear el juego.", detalle: error.message });
            }
    },

    buscarJuegosPorTitulo: async (req, res) => {
    try {
        const { titulo } = req.query;
        
        // 1. Validación del parámetro de búsqueda
        if (!titulo || typeof titulo !== 'string' || titulo.trim() === '') {
            return res.status(400).json({ 
                success: false, 
                error: "El parámetro de búsqueda 'titulo' es obligatorio y debe ser una cadena no vacía."
            });
        }

        const terminoBusqueda = titulo.trim();
        const RAWG_API_KEY = process.env.RAWG_API_KEY || 'TU_API_KEY_AQUÍ';

        // 2. Petición directa a la API de RAWG usando el parámetro de búsqueda
        const response = await fetch(`https://api.rawg.io/api/games?key=${RAWG_API_KEY}&search=${encodeURIComponent(terminoBusqueda)}`);
        
        if (!response.ok) {
            return res.status(response.status).json({ 
                success: false, 
                error: "Error al comunicarse con la API de RAWG." 
            });
        }

        const data = await response.json();
        
        //Mapeamos la respuesta para devolver unicamente los campos requeridos para el buscador, y el id_rawg para que el frontend pueda usarlo para luego pedir los detalles del juego seleccionado
        const juegosFiltrados = data.results.map(juego => ({
            id_rawg: juego.id,                       // El ID original de RAWG que utulizaremos para enlazar después
            titulo: juego.name,                      // Nombre del juego
            lanzamiento: juego.released || null,     // Fecha de lanzamiento
            url_imagen: juego.background_image || null, // Link de la foto
            slug: juego.slug || null,                   // Slug del juego
            calificacion_global: juego.rating || null, // Calificación global del juego
            // Extraemos los géneros del JSON de RAWG y los formateamos
            Generos: juego.genres ? juego.genres.map(g => ({
                id_rawg: g.id,
                nombre: g.name,
                slug: g.slug
            })) : [],
            // Extraemos las plataformas (RAWG las anida dentro de un objeto 'platform')
            Plataformas: juego.platforms ? juego.platforms.map(p => ({
                id_rawg: p.platform.id,
                nombre: p.platform.name,
                slug: p.platform.slug
            })) : [] 
        }));

        // 4. Devolvemos la lista limpia al cliente
        return res.status(200).json({ 
            success: true, 
            origen: 'API RAWG (Buscador)',
            cantidad: juegosFiltrados.length,
            data: juegosFiltrados 
        });

    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            error: "Error interno al intentar buscar los juegos en RAWG.", 
            detalle: error.message 
        });
    }
},

    actualizarJuego: async (req, res) => {
        try{
            const { id } = req.params;
            const { titulo, calificacion_global, lanzamiento, url_imagen, slug } = req.body;

            const juego = await Juego.findByPk(id);
            if (!juego){
                return res.status(404).json({success: false, error: "Juego no encontrado"});
                }

            // Validación opcional de campos, si se proporcionan
            if (calificacion_global !== undefined && (isNaN(parseFloat(calificacion_global)) || calificacion_global < 0 || calificacion_global > 5)) {
                return res.status(400).json({ success: false, error: "La 'calificacion_global' debe ser un float entre 0 y 5."});
            }
            // Validación de fecha de lanzamiento, si se proporciona
            if (lanzamiento && isNaN(Date.parse(lanzamiento))) {
                return res.status(400).json({ success: false, error: "El 'lanzamiento' debe ser una fecha válida."});
            }

            await juego.update({
                titulo: titulo? titulo.trim() : juego.titulo,
                slug: slug? slug.trim() : juego.slug,
                lanzamiento: lanzamiento || juego.lanzamiento,
                url_imagen: url_imagen || juego.url_imagen,
                calificacion_global: calificacion_global !== undefined? calificacion_global : juego.calificacion_global
            });

            return res.status(200).json({ success: true, mensaje: "Juego actualizado correctamente", data: juego });
        } catch (error) {
            return res.status(500).json({success: false, error: "Error interno al intentar actualizar el juego.", detalle: error.message});
        }
    },

    eliminarJuego: async (req, res) => {
        try{
            const { id } = req.params;

            const juego = await Juego.findByPk(id);
            if (!juego){
                return res.status(404).json({success: false, error: "El juego que intenta eliminar no existe."});
            }
            // Si existe, lo borro de la BD
            await juego.destroy();
            return res.status(200).json({ success: true, mensaje: "Juego eliminado correctamente."});
        } catch (error){
            return res.status(500).json({success: false, error: "Error interno al intentar eliminar el juego de la Base de datos.", detalle: error.message})
        }
    }
};

module.exports = videojuegosController;