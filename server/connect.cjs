const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "config.env" });

async function main() {
  const db = process.env.ATLAS_URI;
  const client = new MongoClient(db);

  try {
    await client.connect();
    console.log("✅ Successfully connected to MongoDB Atlas!");

    const collections = await client.db("RepRex_Data").collections();
    collections.forEach((collection) =>
      console.log(`Collection: ${collection.s.namespace.collection}`)
    );
  } catch (e) {
    console.error("Connection error:", e);
  } finally {
    await client.close();
    console.log("🔌 Connection closed.");
  }
}

main();
