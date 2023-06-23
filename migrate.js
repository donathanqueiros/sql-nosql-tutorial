const { mongoClient } = require("./connection/connectionMongo");
const { getSequelize } = require("./connection/connectionSQL");
const initModels = require("./models/init-models");

const migrate = async () => {
  console.log("iniciando conversão...");

  const sequelize = getSequelize();
  const models = initModels(sequelize);

  const [artists, playlists, customers, employees] = await Promise.all([
    getArtists(models),
    getPlaylists(models),
    getCustomers(models),
    getEmployees(models),
  ]);

  const mongo = mongoClient();

  await mongo.collection("artists").deleteMany({});
  await mongo.collection("playlists").deleteMany({});
  await mongo.collection("customers").deleteMany({});
  await mongo.collection("employees").deleteMany({});

  console.log("adicionando artistas");
  await mongo.collection("artists").insertMany(artists);
  const countArtists = await mongo.collection("artists").countDocuments();
  console.log(`artistas adicionados: ${countArtists}`);

  console.log("adicionando playlists");
  await mongo.collection("playlists").insertMany(playlists);
  const countPlaylists = await mongo.collection("playlists").countDocuments();

  console.log(`playlists adicionadas: ${countPlaylists}`);
  await mongo.collection("customers").insertMany(customers);
  const countCustomers = await mongo.collection("customers").countDocuments();
  console.log(`clientes adicionados: ${countCustomers}`);

  console.log("adicionando employees");
  await mongo.collection("employees").insertMany(employees);
  const countEmployees = await mongo.collection("employees").countDocuments();
  console.log(`funcionários adicionados: ${countEmployees}`);

  console.log("conversão finalizada");
};

const getPlaylists = async (models) => {
  return await models.playlists
    .findAll({
      include: [
        {
          model: models.tracks,
          as: "tracks",
          attributes: ["track_id"],
          through: {
            attributes: [],
          },
        },
      ],
    })
    .then(JSON.stringify)
    .then(JSON.parse)
    .then((playlists) => {
      playlists.forEach((playlist) => {
        playlist.track_ids = playlist.tracks.map((track) => track.track_id);
        delete playlist.tracks;
      });

      return playlists;
    })

    .catch((err) => {
      console.log(err);
    });
};

const getArtists = async (models) => {
  /*
   * função para buscar todos os artistas e seus álbuns e suas músicas
   * excluindo dados desnecessários
   */
  return await models.artists
    .findAll({
      include: [
        {
          model: models.albums,
          as: "albums",
          attributes: { exclude: ["artist_id"] },
          include: [
            {
              model: models.tracks,
              as: "tracks",
              attributes: {
                exclude: ["album_id", "media_type_id", "genre_id"],
              },
              include: [
                {
                  model: models.media_types,
                  as: "media_type",
                  attributes: ["name"],
                },
                {
                  model: models.genres,
                  as: "genre",
                  attributes: ["name"],
                },
              ],
            },
          ],
        },
      ],
    })
    .then(JSON.stringify)
    .then(JSON.parse)
    .then((artists) => {
      // criando a estrutura de dados que será usada no mongo removendo dados desnecessários
      artists.forEach((artist) => {
        artist.albums.forEach((album) => {
          album.tracks.forEach((track) => {
            track.media_type = track.media_type.name;
            track.genre = track.genre.name;
          });
          delete album.artist_id;
        });
      });
      return artists;
    });
};

const getCustomers = async (models) => {
  return await models.customers
    .findAll({
      include: [
        {
          model: models.invoices,
          as: "invoices",
          attributes: { exclude: ["customer_id"] },
          include: [
            {
              model: models.tracks,
              as: "tracks",
              attributes: {
                exclude: ["album_id", "media_type_id", "genre_id"],
              },
              through: {
                attributes: [],
              },
            },
          ],
        },
      ],
    })
    .then(JSON.stringify)
    .then(JSON.parse)
    .catch((err) => {
      console.log(err);
    });
};

const getEmployees = async (models) => {
  const employees = await models.employees
    .findAll()
    .then(JSON.stringify)
    .then(JSON.parse)
    .catch((err) => {
      console.log(err);
    });

  return employees;
};

exports.migrate = migrate;
