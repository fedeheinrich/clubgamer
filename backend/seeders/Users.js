const bcrypt = require('bcryptjs');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.insert('users', [
            {
                nombre: 'test',
                email: 'test@gmail.com',
                password: bcrypt.hash('password123', 10),
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.delete(
            'users',
            null,
            {}
        );
    }
}