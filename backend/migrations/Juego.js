module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('juegos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      id_rawg: {
        type: Sequelize.INTEGER,
        allowNull: true, // Corregido: El administrador puede crear un juego que no exista en la API externa
        unique: true   // Agrega restriccion de unicidad para evitar guardar dos veces el mismo juego de RAWG.
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      calificacion_global: { // Corregido el nombre, ya que se cambio a calificacion_global para mayor claridad
        type: Sequelize.FLOAT, // Corregido a FLOAT ya que RAWG lo devuelve en ese formato
        allowNull: true,     // Corregido a true por si el administrador crea un juego que no existe en la API externa y no desea ponerle calificacion (por deberse a un estreno que aun no tiene calificacion,etc)
        validate: {
          min: 0,
          max: 5
        }
      },
      lanzamiento: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      url_imagen: {
        type: Sequelize.STRING,
        allowNull: false
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
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
    await queryInterface.dropTable('juegos')
  }
}
