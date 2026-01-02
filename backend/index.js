import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateRealRoadmap } from "./src/ai/aiService.js";

dotenv.config();
const app = express();

app.use(helmet()); 
app.use(cors());
app.use(express.json({ charset: 'utf-8' }));

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/smart_todo")
  .then(() => console.log("✅ MongoDB Bağlantısı Başarılı"))
  .catch(err => console.error("❌ DB Bağlantı Hatası:", err.message));

const User = mongoose.model("User", new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  tasks: Array // Görevler burada dizi olarak saklanır
}));

// --- GİRİŞ: GÖREVLERİ GERİ GETİRİR ---
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user._id }, "SECRET_KEY");
      // KRİTİK: Giriş yapınca kullanıcının ID'sini ve görevlerini de gönderiyoruz
      return res.json({ token, userId: user._id, tasks: user.tasks || [] });
    }
    res.status(401).json({ error: "E-posta veya şifre hatalı." });
  } catch (e) {
    res.status(500).json({ error: "Giriş hatası." });
  }
});

// --- SENKRONİZASYON: GÖREVLERİ VERİTABANINA KAYDEDER ---
app.post("/api/tasks/sync", async (req, res) => {
  const { userId, tasks } = req.body;
  try {
    await User.findByIdAndUpdate(userId, { tasks });
    res.json({ message: "Görevler senkronize edildi." });
  } catch (e) {
    res.status(500).json({ error: "Veriler kaydedilemedi." });
  }
});

app.post("/api/auth/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await new User({ email, password: hashedPassword, tasks: [] }).save();
    res.json({ message: "Kayıt Başarılı" });
  } catch (e) { res.status(400).json({ error: "E-posta kullanımda." }); }
});

app.post("/api/roadmap", async (req, res) => {
  const { title } = req.body;
  try {
    const roadmap = await generateRealRoadmap(title);
    res.json({ roadmap });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Sunucu http://localhost:${PORT} üzerinde hazır`));