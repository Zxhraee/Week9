const { connect } = require("./app");

async function run() {
  const { client, products } = await connect();

  const res = await products.updateOne(
    { id: 2 },
    { $set: { price: 17.99, units: 28, type: "moisturizer" } }
  );

  console.log("Matched:", res.matchedCount, "Modified:", res.modifiedCount);
  await client.close();
}
run().catch(err => { console.error(err); process.exit(1); });