const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Juego = sequelize.define('Juego', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_rawg: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 100]
      }
    },
    calificacion_global: { // Modifica el nombre para mas claridad, la calificacion personal se encuentra en JuegoUser
      type: DataTypes.FLOAT, // Cambiado a Float por que la API de RAWG devuelve la calificacion con decimales
      allowNull: true, // Cambiado a true para permitir que un administrador pudiera crear un juego sin calificacion
      validate: {   // Corregido a la escala de puntaje de RAWG (0 A 5 Estrellas)
        min: 0,
        max: 5
      }
    },
    url_imagen: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    lanzamiento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    }
  }, {
    tableName: 'juegos',
    timestamps: true,
  });

  return Juego;
};
