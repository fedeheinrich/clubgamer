// backend/models/index.js
const { Sequelize } = require('sequelize');
const config = require('../config/database');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    pool: dbConfig.pool,
    dialectOptions: dbConfig.dialectOptions
  }
);

const UserModel = require('./User');
const User = UserModel(sequelize);

const JuegoModel = require('./Juego');
const Juego = JuegoModel(sequelize);

const JuegoUserModel = require('./JuegoUser');
const JuegoUser = JuegoUserModel(sequelize);

const JuegoGeneroModel = require('./JuegoGenero');
const JuegoGenero = JuegoGeneroModel(sequelize);

const GeneroModel = require('./Genero');
const Genero = GeneroModel(sequelize);

const JuegoPlataformaModel = require('./JuegoPlataforma');
const JuegoPlataforma = JuegoPlataformaModel(sequelize);

const PlataformaModel = require('./Plataforma');
const Plataforma = PlataformaModel(sequelize);

// Relación Usuario - Juego
Juego.belongsToMany(User, {
  through: JuegoUser,
  foreignKey: 'id_juego',
  otherKey: 'id_usuario'
});

User.belongsToMany(Juego, {
  through: JuegoUser,
  foreignKey: 'id_usuario',
  otherKey: 'id_juego'
});

// Relación Juego - Género
Juego.belongsToMany(Genero, {
  through: JuegoGenero,
  foreignKey: 'id_juego',
  otherKey: 'id_genero'
});

Genero.belongsToMany(Juego, {
  through: JuegoGenero,
  foreignKey: 'id_genero',
  otherKey: 'id_juego'
});

// Relación Juego - Plataforma
Juego.belongsToMany(Plataforma, {
  through: JuegoPlataforma,
  foreignKey: 'id_juego',
  otherKey: 'id_plataforma'
});

Plataforma.belongsToMany(Juego, {
  through: JuegoPlataforma,
  foreignKey: 'id_plataforma',
  otherKey: 'id_juego'
});

// Asociaciones directas para consultar la colección con include
JuegoUser.belongsTo(Juego, {
  foreignKey: 'id_juego'
});

Juego.hasMany(JuegoUser, {
  foreignKey: 'id_juego'
});

JuegoUser.belongsTo(User, {
  foreignKey: 'id_usuario'
});

User.hasMany(JuegoUser, {
  foreignKey: 'id_usuario'
});

module.exports = {
  sequelize,
  Sequelize,
  User,
  Juego,
  JuegoUser,
  JuegoPlataforma,
  Plataforma,
  JuegoGenero,
  Genero
};