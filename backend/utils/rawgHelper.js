const { Juego, Genero, Plataforma, JuegoGenero, JuegoPlataforma } = require('../models');
const axios = require('axios');

/**
 *  Funciones Auxiliares
 */

const asociarGeneros = async (idJuegoLocal, generosRawg) => {
    // Si no hay generos para ascoiar en la respueta de la API termina acá
    if (!generosRawg || generosRawg.length === 0) return;
    // Extraemos los IDs que vienen de RAWG
    const idGenerosRawg = generosRawg.map( g => g.id);
    // Buscamos los IDs locales que correspondan a los IDs de RAWG
    const generosLocales = await Genero.findAll({ where: { id_rawg: idGenerosRawg}});
    // Armamos la parejas (ID de nuestro juego local + ID de nuestro genero local)
    const relaciones = generosLocales.map( genero => ({ 
        id_juego: idJuegoLocal, 
        id_genero: genero.id }));
    // Insertamos las parejas en la tabla intermedia
    if (relaciones.length > 0){
        await JuegoGenero.bulkCreate(relaciones);
    }
};

const asociarPlataformas = async (idJuegoLocal, plataformasRawg) => {
    // Si no hay plataformas para asociar termina acá
    if (!plataformasRawg || plataformasRawg.length === 0) return;
    // Extraemos los IDs que vienen de RAWG
    const idPlataformasRawg = plataformasRawg.map( p => p.platform.id);
    // Buscamos los IDs locales que correspondan a los IDs de RAWG
    const plataformasLocales = await Plataforma.findAll({ where: { id_rawg: idPlataformasRawg}});
    // Armamos la parejas (ID de nuestro juego local + ID de nuestra plataforma local)
    const relaciones = plataformasLocales.map( plataforma => ({ 
        id_juego: idJuegoLocal, 
        id_plataforma: plataforma.id }));
    // Insertamos las parejas en la tabla intermedia
    if (relaciones.length > 0){
        await JuegoPlataforma.bulkCreate(relaciones);
    }
};

/**
 * Consulta a la API Rawg y devuelve el objeto mapeado y listo para usar
 */
const consultarRawgApi = async (id_rawg) =>{
    const API_KEY = process.env.RAWG_API_KEY || 'TU_API_KEY';
    const response = await axios.get(`https://api.rawg.io/api/games/${id_rawg}?key=${API_KEY}`);
    const datosRawg = response.data;

    return {
        id_rawg: datosRawg.id,
        titulo: datosRawg.name, 
        slug: datosRawg.slug,  
        calificacion_global: datosRawg.rating,
        url_imagen: datosRawg.background_image,
        lanzamiento: datosRawg.released,
        generos: datosRawg.genres, // Este es el array de generos que viene de RAWG, lo uso para asociar los generos en la BD local
        plataformas: datosRawg.platforms // Este es el array de plataformas que viene de RAWG, lo uso para asociar las plataformas en la BD local
    };
}

/**
 * Funcion Principal
 * Busca un juego en nuestra base de datos por su id_rawg
 * Si no existe, lo busca en la API externa, lo clona en la BD local con sus relaciones y lo devuelve
 */
const obtenerJuego = async (id_rawg) => {
    try {
        // 1. Busca en nuestra base de datos local
        let juego = await Juego.findOne({
            where:{id_rawg},
            include: [
                { model: Genero, attributes: ['id', 'nombre'], through: { attributes: [] } }, 
                { model: Plataforma, attributes: ['id', 'nombre'], through: { attributes: [] } } 
            ]
        });
        if(juego){
            return juego;
        }
        // 2. Si no existe en la base de datos, consultamos a la API
        const datosJuego = await consultarRawgApi(id_rawg);
        // Le quitamos los arrays de generos y plataformas para que no se guarden en la tabla juegos
        const { generos, plataformas, ...datosBaseJuego} = datosJuego;
        //3. Lo guardamos en nuestra base de datos
        juego = await Juego.create(datosBaseJuego);
        // 4. Asociamos los generos y plataformas en las tablas intermedias
        await asociarGeneros(juego.id, generos);
        await asociarPlataformas(juego.id, plataformas);
        // 5. Devuelvo el juego con sus relaciones para que el controlador lo envie al cliente
        const juegoCompleto = await Juego.findByPk(juego.id, {
            include: [
                { model: Genero, attributes: ['id', 'nombre'], through: { attributes: [] } }, 
                { model: Plataforma, attributes: ['id', 'nombre'], through: { attributes: [] } } 
            ]
        })
        return juegoCompleto;
    } catch (error) {
        console.error(`Error en rawgHelper para el id_rawg ${id_rawg}:`, error.message);
        throw error; // Le envio el error al controlador para que responda con HTTP Status 500 o 404
    }
}

// Exporto la funcion principal
module.exports = {obtenerJuego};