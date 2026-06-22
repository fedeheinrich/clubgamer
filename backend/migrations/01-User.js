module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // Agrega unique: true para que no se registren usuarios distintos con el mismo email
      },        // Se quitaron las validaciones de caracteres por que van en el modelo
      password: {
        type: Sequelize.STRING,
        allowNull: false, 
      },          // Se quitaron las validaciones de caracteres por que van en el modelo
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users')
  }
}
