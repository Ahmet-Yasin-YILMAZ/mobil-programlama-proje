import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import todosRouter from "./src/routes/todos.routes.js";

dotenv.config();

const app = express();

// Proje kuralı: Web Security Implementation (Helmet & CORS) 
app.use(helmet()); 
app.use(cors());
app.use(express.json());

// Proje kuralı: Web Service Implementation (Express API) 
app.use("/todos", todosRouter);

// Sağlık kontrolü ve sahiplik doğrulaması
app.get("/health", (req, res) => {
  res.json({ 
    status: "active", 
    owner: "Ahmet Yasin YILMAZ",
    layer: "Web Service"
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API running on http://localhost:${PORT}`);
});