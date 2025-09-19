const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const uri = "mongodb://127.0.0.1:27017";
const dbName = "mydb";
const colName = "products";

async function getCollection() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  return { client, col: db.collection(colName) };
}

app.get("/products", async (req, res) => {
  const { client, col } = await getCollection();
  try {
    const docs = await col.find({}).sort({ id: 1 }).toArray();
    res.json(docs.map(d => ({ ...d, _id: d._id.toString() })));
  } catch (e) {
    res.status(500).json({ error: e.message });
  } finally { await client.close(); }
});

app.get('/products/:id', async (req, res) => {
  const { client, col } = await getCollection();
  try {
    const doc = await col.findOne({ _id: new ObjectId(req.params.id) });
    if (!doc) return res.status(404).json({ error: 'Not Found' });
    res.json({ ...doc, _id: doc._id.toString() });
  } catch (e) {
    res.status(500).json({ error: e.message });
  } finally {
    await client.close();
  }
});

app.post("/products", async (req, res) => {
  const { client, col } = await getCollection();
  try {
    const last = await col.find().sort({ id: -1 }).limit(1).toArray();
    const nextId = last.length ? (last[0].id || 0) + 1 : 1;
    const product = { id: nextId, ...req.body };
    const result = await col.insertOne(product);
    res.status(201).json({ ...product, _id: result.insertedId.toString() });
  } catch (e) {
    res.status(500).json({ error: e.message });
  } finally { await client.close(); }
});

app.put('/products/:id', async (req, res) => {
  const { client, col } = await getCollection();
  try {
    const result = await col.findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body },
      { returnDocument: 'after' }
    );
    if (!result.value) return res.status(404).json({ error: 'Not Found' });
    const doc = result.value;
    res.json({ ...doc, _id: doc._id.toString() });
  } finally { await client.close(); }
});

app.delete("/products/:id", async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ObjectId" });
  const { client, col } = await getCollection();
  try {
    const result = await col.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  } finally { await client.close(); }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));
