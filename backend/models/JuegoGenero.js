const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const JuegoGenero = sequelize.define('JuegoGenero', {
    id_juego: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_genero: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'juegos_generos', // Corregido a plural para mantener consistencia con todos los archivos
    timestamps: true,
  });

  return JuegoGenero;
};
