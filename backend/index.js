// backend/index.js

import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import { requireAuth } from "./src/auth/auth.stub.js";

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

// Public health check – herkes erişebilir
app.get("/health", (req, res) => res.json({ ok: true }));

// Authorization örneği: sadece giriş yapmış kullanıcı erişebilsin
app.get("/me", requireAuth, (req, res) => {
  return res.json({
    message: "Bu endpoint'e sadece yetkili (authenticated) kullanıcı erişebilir.",
    user: req.user,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
