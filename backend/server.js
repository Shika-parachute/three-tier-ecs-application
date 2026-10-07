const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 5000;

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://mongodb.three-tier.local:27017";

const client = new MongoClient(MONGODB_URI);

app.use(cors());
app.use(express.json());

let tasksCollection;

async function connectDatabase() {
  await client.connect();

  const db = client.db("three_tier_db");
  tasksCollection = db.collection("tasks");

  console.log("Connected to MongoDB");
}

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "backend"
  });
});

app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await tasksCollection.find({}).toArray();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

app.post("/api/tasks", async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const task = {
      title,
      completed: false,
      createdAt: new Date()
    };

    const result = await tasksCollection.insertOne(task);

    res.status(201).json({
      _id: result.insertedId,
      ...task
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create task" });
  }
});

app.listen(PORT, "0.0.0.0", async () => {
  console.log(`Backend running on port ${PORT}`);

  try {
    await connectDatabase();
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
});