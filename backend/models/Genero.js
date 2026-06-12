const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Genero = sequelize.define('Genero', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 100]
      }
    }
  }, {
    tableName: 'genero',
    timestamps: true,
  });

  return Genero;
};