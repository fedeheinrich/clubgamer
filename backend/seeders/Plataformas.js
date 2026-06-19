const axios = require('axios');
require('dotenv').config();

module.exports = {
    async up(queryInterface, Sequelize) {
        const response = await axios.get(
            `https://api.rawg.io/api/platforms?key=${process.env.RAWG_API_KEY}`
        )

        const plataformas = response.data.map(plataforma => ({
            id_rawg: plataforma.id,
            nombre: plataforma.name,
            slug: plataforma.slug,
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