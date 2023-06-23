const { MongoClient, Db } = require("mongodb");

const url = "mongodb://localhost:27017"; // url padrão de conexão local
const dbName = "soungy"; // nome do banco de dados

let db = null;

async function connectMongo() {
  try {
    const client = await MongoClient.connect(url);
    console.log("Conexão estabelecida com o servidor MongoDB.");

    db = client.db(dbName);

    console.log(`Conectado ao banco de dados: ${dbName}`);
  } catch (error) {
    console.log("Erro ao conectar ao MongoDB:", error);
  }
}

function mongoClient() {
  if (!db) {
    console.log(
      "Você precisa chamar connectMongo() antes de obter a instância do banco de dados."
    );
    return null;
  }

  if (db instanceof Db) return db;
}

exports.connectMongo = connectMongo;
exports.mongoClient = mongoClient;
