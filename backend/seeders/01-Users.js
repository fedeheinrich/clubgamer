const bcrypt = require('bcryptjs');

module.exports = {
    async up(queryInterface, Sequelize) {
        const hashedPassword = await bcrypt.hash('password123', 10);
        await queryInterface.bulkInsert('users', [
            {
                nombre: 'test',
                email: 'test@gmail.com',
                password: hashedPassword,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete(
            'users',
            null,
            {}
        );
    }
}
