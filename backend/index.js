// backend/index.js

import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import { Roles } from "./src/auth/roles.js";
import { authorize } from "./src/auth/authorize.js";

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

// Basit health check
app.get("/health", (req, res) => res.json({ ok: true }));

// RBAC korumalı örnek endpoint:
// Sadece ADMIN rolündeki kullanıcılar erişebilsin
app.get("/admin/secure-info", authorize([Roles.ADMIN]), (req, res) => {
  return res.json({
    message: "Bu endpoint sadece ADMIN rolü için görünür.",
    user: req.user,
  });
});

// Herkesin erişebildiği basit public endpoint
app.get("/public-info", (req, res) => {
  return res.json({
    message: "Bu endpoint tüm roller için açık (rol kontrolü yok).",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`API running on http://localhost:${PORT}`)
);
