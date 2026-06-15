const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const JuegoUser = sequelize.define('JuegoUser', {
    id_juego: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true // Clave Compuesta Parte 1
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true // Clave Compuesta Parte 2
    },
    calificacion_personal: {
      type: DataTypes.INTEGER,
      allowNull: true, // Corregido a true para que inicie en null, un usuario que agrego un juego en estado "Pendiente" no deberia poder calificarlo
      validate: {
        min: 1,
        max: 10
      }
    },
    tiempo_de_juego_horas: {
      type: DataTypes.FLOAT,
      defaultValue: 0, // Corregido: inicia en 0 horas
      allowNull: false
    },
    estado: {
        type: DataTypes.ENUM( // Correcion de sintaxis, ENUM todo Mayuscula o todo Minuscula
            'completado',
            'jugando',
            'pendiente'
        ),
        allowNull: false,
        defaultValue: 'pendiente'
    }
  }, {
    tableName: 'juegos_usuarios', // Corrige a plural para mantener consistencia con los demas archivos
    timestamps: true,
  });

  return JuegoUser;
};
