const { Sequelize } = require("sequelize");

let sequelize = null;

const connectSQLDB = async () => {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./chinook.db",
    logging: false,
  });

  await sequelize
    .authenticate()
    .then(() => {
      console.log("Conexão com o banco de dados SQL estabelecida com sucesso");
    })
    .catch((error) => {
      console.log("Erro ao conectar com o banco de dados:", error);
    });

  sequelize.sync();
};

const getSequelize = () => {
  if (!sequelize) {
    console.log("Conexão com o banco de dados não estabelecida");
    return null;
  }

  if (sequelize instanceof Sequelize) return sequelize;
};

exports.connectSQLDB = connectSQLDB;
exports.getSequelize = getSequelize;
