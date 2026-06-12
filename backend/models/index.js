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

Juego.belongsToMany(User, {
  through: JuegoUser,
  foreignKey: 'id_juego'
});

User.belongsToMany(Juego, {
  through: JuegoUser,
  foreignKey: 'id_usuario'
});

Juego.belongsToMany(Genero, {
  through: JuegoGenero,
  foreignKey: 'id_juego'
});

Genero.belongsToMany(Juego, {
  through: JuegoGenero,
  foreignKey: 'id_genero'
});

Juego.belongsToMany(Plataforma, {
  through: JuegoPlataforma,
  foreignKey: 'id_juego'
});

Plataforma.belongsToMany(Juego, {
  through: JuegoPlataforma,
  foreignKey: 'id_plataforma'
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