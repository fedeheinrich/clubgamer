const axios = require('axios');
require('dotenv').config();

module.exports = {
    async up(queryInterface, Sequelize) {
        let juegosPopulares = [];

        //Para no sobrecargar la API solo se consultan los 200 más populares en 5 consultas de 40 páginas
        for (let pagina = 1; pagina <= 5; pagina++) {
            const url = `https://api.rawg.io/API/games?key=${process.env.RAWG_API_KEY}&ordering=-added&page_size=40&page=${pagina}`;
            const response = await axios.get(url);
            juegosPopulares.push(...response.data.results);
        }

        const juegos = juegosPopulares.map(juego => ({
            id_rawg: juego.id,
            titulo: juego.name,
            slug: juego.slug,
            lanzamiento: juego.released,
            url_imagen: juego.background_image,
            calificacion_global: juego.rating,
            createdAt: new Date(),
            updatedAt: new Date(),
        }));

        await queryInterface.bulkInsert(
            'juegos',
            juegos
        );
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete(
            'juegos',
            null,
            {}
        );
    }
}