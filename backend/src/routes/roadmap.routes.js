import express from "express";
import { generateRealRoadmap } from "../ai/aiService.js";

const router = express.Router();

// AI Yol Haritası Üretme
router.post("/", async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Başlık gerekli" });

  try {
    const roadmap = await generateRealRoadmap(title);
    res.json({ title, roadmap });
  } catch (error) {
    res.status(500).json({ error: "AI bağlantı hatası" });
  }
});

export default router;