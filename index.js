const { connectMongo } = require("./connection/connectionMongo");
const { connectSQLDB } = require("./connection/connectionSQL");
const { migrate } = require("./migrate");

const start = async () => {
  await connectSQLDB();
  await connectMongo();
  await migrate();
};

start();
