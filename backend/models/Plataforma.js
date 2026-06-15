const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Plataforma = sequelize.define('Plataforma', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_rawg:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 100]
      }
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'plataformas',
    timestamps: true,
  });

  return Plataforma;
};
