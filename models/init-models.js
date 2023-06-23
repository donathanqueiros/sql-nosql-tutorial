var DataTypes = require("sequelize").DataTypes;
var _albums = require("./albums");
var _artists = require("./artists");
var _customers = require("./customers");
var _employees = require("./employees");
var _genres = require("./genres");
var _invoice_items = require("./invoice_items");
var _invoices = require("./invoices");
var _media_types = require("./media_types");
var _playlist_track = require("./playlist_track");
var _playlists = require("./playlists");
var _sqlite_stat1 = require("./sqlite_stat1");
var _tracks = require("./tracks");

function initModels(sequelize) {
  var albums = _albums(sequelize, DataTypes);
  var artists = _artists(sequelize, DataTypes);
  var customers = _customers(sequelize, DataTypes);
  var employees = _employees(sequelize, DataTypes);
  var genres = _genres(sequelize, DataTypes);
  var invoice_items = _invoice_items(sequelize, DataTypes);
  var invoices = _invoices(sequelize, DataTypes);
  var media_types = _media_types(sequelize, DataTypes);
  var playlist_track = _playlist_track(sequelize, DataTypes);
  var playlists = _playlists(sequelize, DataTypes);
  var sqlite_stat1 = _sqlite_stat1(sequelize, DataTypes);
  var tracks = _tracks(sequelize, DataTypes);

  tracks.belongsTo(albums, { as: "album", foreignKey: "album_id" });
  albums.hasMany(tracks, { as: "tracks", foreignKey: "album_id" });
  albums.belongsTo(artists, { as: "artist", foreignKey: "artist_id" });
  artists.hasMany(albums, { as: "albums", foreignKey: "artist_id" });
  invoices.belongsTo(customers, { as: "customer", foreignKey: "customer_id" });
  customers.hasMany(invoices, { as: "invoices", foreignKey: "customer_id" });
  customers.belongsTo(employees, {
    as: "support_rep",
    foreignKey: "support_rep_id",
  });
  employees.hasMany(customers, {
    as: "customers",
    foreignKey: "support_rep_id",
  });
  employees.belongsTo(employees, {
    as: "reports_to_employee",
    foreignKey: "reports_to",
  });
  employees.hasMany(employees, { as: "employees", foreignKey: "reports_to" });
  tracks.belongsTo(genres, { as: "genre", foreignKey: "genre_id" });
  genres.hasMany(tracks, { as: "tracks", foreignKey: "genre_id" });
  tracks.belongsTo(media_types, {
    as: "media_type",
    foreignKey: "media_type_id",
  });
  media_types.hasMany(tracks, { as: "tracks", foreignKey: "media_type_id" });

  // invoices.hasMany(invoice_items, { as: "invoice_items", foreignKey: "invoice_id"});
  // invoice_items.belongsTo(invoices, { as: "invoice", foreignKey: "invoice_id"});
  // playlist_track.belongsTo(playlists, { as: "playlist", foreignKey: "playlist_id"});
  // playlists.hasMany(playlist_track, { as: "playlist_tracks", foreignKey: "playlist_id"});
  // invoice_items.belongsTo(tracks, { as: "track", foreignKey: "track_id"});
  // tracks.hasMany(invoice_items, { as: "invoice_items", foreignKey: "track_id"});
  // playlist_track.belongsTo(tracks, { as: "track", foreignKey: "track_id"});
  // tracks.hasMany(playlist_track, { as: "playlist_tracks", foreignKey: "track_id"});

  //added by me
  invoices.belongsToMany(tracks, {
    as: "tracks",
    through: invoice_items,
    foreignKey: "invoice_id",
    otherKey: "track_id",
  });
  tracks.belongsToMany(invoices, {
    as: "invoices",
    through: invoice_items,
    foreignKey: "track_id",
    otherKey: "invoice_id",
  });
  playlists.belongsToMany(tracks, {
    as: "tracks",
    through: playlist_track,
    foreignKey: "playlist_id",
    otherKey: "track_id",
  });
  tracks.belongsToMany(playlists, {
    as: "playlists",
    through: playlist_track,
    foreignKey: "track_id",
    otherKey: "playlist_id",
  });

  return {
    albums,
    artists,
    customers,
    employees,
    genres,
    invoice_items,
    invoices,
    media_types,
    playlist_track,
    playlists,
    sqlite_stat1,
    tracks,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
