const axios = require('axios');
require('dotenv').config();

module.exports = {
    async up(queryInterface, Sequelize) {
        const response = await axios.get(
            `https://api.rawg.io/api/genres?key=${process.env.RAWG_API_KEY}`
        )

        const generos = response.data.results.map(genero => ({
            id_rawg: genero.id,
            nombre: genero.name,
            slug: genero.slug,
            createdAt: new Date(),
            updatedAt: new Date(),
        }));

        await queryInterface.bulkInsert(
            'generos',
            generos
        );
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete(
            'generos',
            null,
            {}
        );
    }
}