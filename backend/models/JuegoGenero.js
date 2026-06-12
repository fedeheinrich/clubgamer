const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const JuegoGenero = sequelize.define('JuegoGenero', {
    id_juego: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_genero: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'juegoGenero',
    timestamps: true,
  });

  return JuegoGenero;
};