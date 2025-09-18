const { connect } = require("./app");

async function run() {
  const { client, products } = await connect();

  const res = await products.deleteOne({ id: 3 });

  console.log("Deleted count:", res.deletedCount);
  await client.close();
}
run().catch(err => { console.error(err); process.exit(1); });