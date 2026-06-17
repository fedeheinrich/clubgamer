module.exports = {
    async up(queryInterface, Sequelize) {
        const juegosUsers = {
            id_usuario: 1,
            id_juego: 1,
            calificacion_personal: 4,
            tiempo_de_juego_horas: 2.5,
            estado: 'jugando',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await queryInterface.bulkInsert(
            'juegos_users',
            juegosUsers
        );
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete(
            'juegos_users',
            null,
            {}
        );
    }
}