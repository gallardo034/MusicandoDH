var DataTypes = require("sequelize").DataTypes;
var _albumes = require("./albumes");
var _artistas = require("./artistas");
var _canciones = require("./canciones");
var _generos = require("./generos");

function initModels(sequelize) {
  var albumes = _albumes(sequelize, DataTypes);
  var artistas = _artistas(sequelize, DataTypes);
  var canciones = _canciones(sequelize, DataTypes);
  var generos = _generos(sequelize, DataTypes);

  canciones.belongsTo(albumes, { as: "album", foreignKey: "album_id"});
  albumes.hasMany(canciones, { as: "canciones", foreignKey: "album_id"});
  canciones.belongsTo(artistas, { as: "artistum", foreignKey: "artista_id"});
  artistas.hasMany(canciones, { as: "canciones", foreignKey: "artista_id"});
  canciones.belongsTo(generos, { as: "genero", foreignKey: "genero_id"});
  generos.hasMany(canciones, { as: "canciones", foreignKey: "genero_id"});

  return {
    albumes,
    artistas,
    canciones,
    generos,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
