import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Güvenlik Katmanları (Kürşat - Web Security)
app.use(helmet());
app.use(cors());
app.use(express.json());

// Sağlık kontrolü ve Sahiplik Doğrulaması
app.get("/health", (req, res) => {
  return res.json({ 
    ok: true, 
    owner: "Kürşat Emircan BALTA",
    status: "Session & Cookie Layer Active" 
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 API running on http://localhost:${PORT}`);
});