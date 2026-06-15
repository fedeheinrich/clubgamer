const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const JuegoPlataforma = sequelize.define('JuegoPlataforma', {
    id_juego: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true // Parte 1 de la Clave Compuesta
    },
    id_plataforma: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true // Parte 2 de la Clave Compuesta
    }
  }, {
    tableName: 'juegos_plataformas', // Corregido a plural para mantener consistencia con los demas archivos
    timestamps: true,
  });

  return JuegoPlataforma;
};
