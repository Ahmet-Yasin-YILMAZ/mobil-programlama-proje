// backend/src/session/session.controller.js

import { Router } from "express";

const router = Router();

// Login: user cookie’ye yaz
router.post("/login", (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "username required" });
  }

  const user = { username };
  res.cookie("user", JSON.stringify(user), {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 gün
  });

  return res.json({ message: "login successful", user });
});

// Logout: cookie’yi sil
router.post("/logout", (req, res) => {
  res.clearCookie("user");
  return res.json({ message: "logout successful" });
});

// Me: cookie’den current user
router.get("/me", (req, res) => {
  if (!req.user) return res.status(401).json({ error: "not logged in" });
  return res.json({ user: req.user });
});

export default router;
