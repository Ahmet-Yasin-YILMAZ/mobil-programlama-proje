import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import { suggestTodoTitle } from "./src/ai/ai.stub.js";
import todosRouter from "./src/routes/todos.routes.js";

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/todos", todosRouter);

// AI servis endpoint'i
app.post("/ai/suggest-todo-title", async (req, res) => {
  const { title } = req.body || {};

  if (!title || typeof title !== "string") {
    return res.status(400).json({ error: "title is required" });
  }

  const suggestion = await suggestTodoTitle(title);

  return res.json({
    input: title,
    suggestion,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});