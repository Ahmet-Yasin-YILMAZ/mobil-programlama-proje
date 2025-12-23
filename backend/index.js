import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

// 🔽 YENİ EKLEDİĞİMİZ KISIM
import todosRouter from "./src/routes/todos.routes.js";
app.use("/todos", todosRouter);
// 🔼 YENİ EKLEDİĞİMİZ KISIM

app.get("/health", (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
