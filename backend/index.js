import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import todosRouter from "./src/routes/todos.routes.js";
import { suggestTodoTitle } from "./src/ai/ai.stub.js";

dotenv.config();

const app = express();

// Proje kuralı: Web Security Implementation (Helmet & CORS) 
app.use(helmet()); 
app.use(cors());
app.use(express.json());

// Sağlık kontrolü ve sahiplik doğrulaması (Ahmet Yasin YILMAZ)
app.get("/health", (req, res) => {
  res.json({ 
    status: "active", 
    owner: "Ahmet Yasin YILMAZ",
    layer: "Web Service"
  });
});

// Proje kuralı: Web Service Implementation (Express API) [cite: 14]
app.use("/todos", todosRouter);

// Cloud Service (AI) Endpoint'i (Kürşat'ın geliştirmesiyle entegrasyon) [cite: 20]
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
  console.log(`🚀 API running on http://localhost:${PORT} - Web Service & AI Integrated`);
});