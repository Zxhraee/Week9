const { connect } = require("./app");

async function run() {
  const { client, products } = await connect();
  const docs = await products.find({}).sort({ id: 1 }).toArray();
  console.table(docs, ["id", "name", "price", "type", "units"]);
  await client.close();
}
run().catch(err => { console.error(err); process.exit(1); });