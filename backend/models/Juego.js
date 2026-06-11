const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Juego = sequelize.define('Juego', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 100]
      }
    },
    calificacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 10
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
    }
  }, {
    tableName: 'juegos',
    timestamps: true,
  });

  return Juego;
};
