import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGO_URI as string;
const client = new MongoClient(uri);

let db: Db;

export async function connectToDatabase() {
  if (db) return db;

  try {
    await client.connect();
    db = client.db("analysis_db");
    console.log("🍃 Successfully connected to MongoDB native driver");
    return db;
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}

export { db };