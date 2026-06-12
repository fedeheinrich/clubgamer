const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const JuegoPlataforma = sequelize.define('JuegoPlataforma', {
    id_juego: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_plataforma: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'juegoPlataforma',
    timestamps: true,
  });

  return JuegoPlataforma;
};