const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('canciones', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    titulo: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    duracion: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    genero_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'generos',
        key: 'id'
      }
    },
    album_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'albumes',
        key: 'id'
      }
    },
    artista_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'artistas',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'canciones',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "canciones_generos_idx",
        using: "BTREE",
        fields: [
          { name: "genero_id" },
        ]
      },
      {
        name: "canciones_albumes_idx",
        using: "BTREE",
        fields: [
          { name: "album_id" },
        ]
      },
      {
        name: "canciones_artistas_idx",
        using: "BTREE",
        fields: [
          { name: "artista_id" },
        ]
      },
    ]
  });
};
