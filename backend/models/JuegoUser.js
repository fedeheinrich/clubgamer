const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const JuegoUser = sequelize.define('JuegoUser', {
    id_juego: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    calificacion_personal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 10
      }
    },
    tiempo_de_juego_horas: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    estado: {
        type: DataTypes.ENUM(
            'Completado',
            'Jugando',
            'Pendiente'
        ),
        allowNull: false
    }
  }, {
    tableName: 'juegoUser',
    timestamps: true,
  });

  return JuegoUser;
};
