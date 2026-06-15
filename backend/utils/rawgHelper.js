const { Juego } = require('../models');
const axios = require('axios');

/**
 * Funcion auxiliar que consulta a la API Rawg y devuelve el objeto mapeado y listo para usar
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
        lanzamiento: datosRawg.released
    };
}

/**
 * Busca un juego en nuestra base de datos por su id_rawg
 * Si no existe, lo busca en la API externa, lo clona en la BD local y lo devuelve
 */
const obtenerJuego = async (id_rawg) => {
    try {
        // 1. Busca en nuestra base de datos local
        let juego = await Juego.findOne({where:{id_rawg}});
        if(juego){
            return juego;
        }
        // 2. Si no existe en la base de datos, consultamos a la API
        const datosJuego = await consultarRawgApi(id_rawg);

        //3. Lo guardamos en nuestra base de datos
        juego = await Juego.create(datosJuego);

        return juego;
    } catch (error) {
        console.error(`Error en rawgHelper para el id_rawg ${id_rawg}:`, error.message);
        throw error; // Le envio el error al controlador para que responda con HTTP Status 500 o 404
    }
}

// Exporto la funcion principal
module.exports = {obtenerJuego};