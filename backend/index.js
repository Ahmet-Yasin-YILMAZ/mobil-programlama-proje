// backend/index.js

import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

// Sağlık kontrolü – tüm branch’lerde ortak, basit endpoint
app.get("/health", (req, res) => {
  return res.json({ ok: true });
});

// Şimdilik BU branch’te todos, RBAC vs. YOK
// Diğer branch’lerde (web-service, rbac, authorization) kendi index.js’leri olacak.

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
