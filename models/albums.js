const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('albums', {
    album_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'AlbumId'
    },
    title: {
      type: DataTypes.STRING(160),
      allowNull: false,
      field: 'Title'
    },
    artist_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'artists',
        key: 'ArtistId'
      },
      field: 'ArtistId'
    }
  }, {
    sequelize,
    tableName: 'albums',
    timestamps: false,
    indexes: [
      {
        name: "IFK_AlbumArtistId",
        fields: [
          { name: "ArtistId" },
        ]
      },
    ]
  });
};
