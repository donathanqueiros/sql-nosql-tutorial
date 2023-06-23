const express = require("express");
const { MongoClient, Db } = require("mongodb");
const { Sequelize } = require("sequelize");
const initModels = require("./models/init-models");
const app = express();
const port = 8000;

app.use("/mongo/:resouces", async (req, res) => {
  const db = getDB();
  try {
    const collection = db.collection(req.params.resouces);
    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (error) {
    res.json({ message: error.message });
  }
});

app.use("/sql/:resouces", async (req, res) => {
  var models = initModels(getSequlize());

  try {
    await models[req.params.resouces].findAll().then((resouces) => {
      res.json(resouces);
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});
app.listen(port, async () => {
  await connectMongo();
  await connectSQLDB();

  console.log(`APP INICADO NA PORTA: ${port}`);
});

let db = null;

async function connectMongo() {
  try {
    const client = await MongoClient.connect("mongodb://localhost:27017");
    console.log("Conexão estabelecida com o servidor MongoDB.");

    db = client.db("soungy");

    console.log(`Conectado ao banco de dados: soungy.`);
  } catch (error) {
    console.log("Erro ao conectar ao MongoDB:", error);
  }
}

let sequelizeClient = null;

async function connectSQLDB() {
  try {
    const sequelize = new Sequelize({
      dialect: "sqlite",
      storage: "./chinook.db",
      logging: false,
    });

    await sequelize
      .authenticate()
      .then(() => {
        console.log("Conexão com o banco de dados estabelecida com sucesso");
      })
      .catch((error) => {
        console.log("Erro ao conectar com o banco de dados:", error);
      });

    sequelize.sync();
    sequelizeClient = sequelize;
  } catch (error) {
    console.log("Erro ao conectar ao SQL:", error);
  }
}

function getSequlize() {
  if (!sequelizeClient) {
    console.log(
      "Você precisa chamar conectar() antes de obter a instância do banco de dados."
    );
  }

  return sequelizeClient;
}

function getDB() {
  if (!db) {
    console.log(
      "Você precisa chamar conectar() antes de obter a instância do banco de dados."
    );
  }

  if (db instanceof Db) return db;

  return null;
}
