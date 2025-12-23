// backend/index.js (web-security branch)

import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import { rateLimit } from "./src/security/rateLimit.stub.js";

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

// Global rate limit middleware
app.use(rateLimit);

// Basit health check
app.get("/health", (req, res) => res.json({ ok: true }));

// Örnek public endpoint
app.get("/public", (req, res) => {
  return res.json({
    message: "public endpoint OK",
    timestamp: new Date().toISOString(),
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
