const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";
const dbName = "mydb";

async function connect() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  const products = db.collection("products");
  return { client, db, products };
}

module.exports = { connect };