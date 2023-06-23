const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "playlist_track",
    {
      playlist_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "playlists",
          key: "PlaylistId",
        },
        unique: true,
        field: "PlaylistId",
      },
      track_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "tracks",
          key: "TrackId",
        },
        field: "TrackId",
      },
    },
    {
      sequelize,
      tableName: "playlist_track",
      timestamps: false,
      indexes: [
        {
          name: "sqlite_autoindex_playlist_track_1",
          unique: true,
          fields: [{ name: "PlaylistId" }, { name: "TrackId" }],
        },
        {
          name: "IFK_PlaylistTrackTrackId",
          fields: [{ name: "TrackId" }],
        },
      ],
    }
  );
};
