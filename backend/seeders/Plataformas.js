const axios = require('axios');
require('dotenv').config();

module.exports = {
    async up(queryInterface, Sequelize) {
        const response = await axios.get(
            `https://api.rawg.io/API/platforms?key=${process.env.RAWG_API_KEY}`
        )

        const plataformas = response.data.map(plataforma => ({
            id_rawg: plataforma.results.id,
            nombre: plataforma.results.name,
            slug: plataforma.results.slug,
            createdAt: new Date(),
            updatedAt: new Date(),
        }));

        await queryInterface.bulkInsert(
            'plataformas',
            plataformas
        );
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete(
            'plataformas',
            null,
            {}
        );
    }
}