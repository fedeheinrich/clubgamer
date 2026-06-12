const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Plataforma = sequelize.define('Plataforma', {
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
    tableName: 'plataforma',
    timestamps: true,
  });

  return Plataforma;
};