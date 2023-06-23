const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tracks', {
    track_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'TrackId'
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: 'Name'
    },
    album_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'albums',
        key: 'AlbumId'
      },
      field: 'AlbumId'
    },
    media_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'media_types',
        key: 'MediaTypeId'
      },
      field: 'MediaTypeId'
    },
    genre_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'genres',
        key: 'GenreId'
      },
      field: 'GenreId'
    },
    composer: {
      type: DataTypes.STRING(220),
      allowNull: true,
      field: 'Composer'
    },
    milliseconds: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'Milliseconds'
    },
    bytes: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'Bytes'
    },
    unit_price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      field: 'UnitPrice'
    }
  }, {
    sequelize,
    tableName: 'tracks',
    timestamps: false,
    indexes: [
      {
        name: "IFK_TrackAlbumId",
        fields: [
          { name: "AlbumId" },
        ]
      },
      {
        name: "IFK_TrackGenreId",
        fields: [
          { name: "GenreId" },
        ]
      },
      {
        name: "IFK_TrackMediaTypeId",
        fields: [
          { name: "MediaTypeId" },
        ]
      },
    ]
  });
};
