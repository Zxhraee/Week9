const { connect } = require("./app");

async function run() {
  const { client, products } = await connect();

  await products.drop().catch(() => {});
  await products.createIndex({ id: 1 }, { unique: true });

  const seed = [
    { id: 1, name: "Lip Gloss",  description: "Sheer shine gloss",     price: 9.99,  units: 50, type: "makeup" },
    { id: 2, name: "Face Cream", description: "Daily hydrating cream", price: 19.99, units: 30, type: "skincare" },
    { id: 3, name: "Serum",      description: "Vitamin C brightening", price: 24.50, units: 20, type: "skincare" }
  ];

  await products.insertMany(seed);
  console.log("Inserted", seed.length, "beauty products");
  await client.close();
}
run().catch(err => { console.error(err); process.exit(1); });