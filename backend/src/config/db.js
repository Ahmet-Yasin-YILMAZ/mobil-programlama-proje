import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

export async function connectDB() {
  await client.connect();
  const db = client.db("smart_todo");
  console.log("✅ Data Layer: MongoDB (todos, users, roles) hazır."); // [cite: 42]
  return {
    todos: db.collection("todos"),
    users: db.collection("users"),
    roles: db.collection("roles")
  };
}