const MongoClient = require('mongodb').MongoClient;
const { DB_NAME, DB_SERVER } = process.env;

const uri = `mongodb://${DB_SERVER}`;

let connection;

async function connectDB() {
  if (connection) return connection;
  let client;
  try {
    client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    connection = client.db(DB_NAME);
    return connection;
  } catch (error) {
    console.log('Could not connect to the database', error);
    process.exit(1);
  }
}

module.exports = connectDB;
