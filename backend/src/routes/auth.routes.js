import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();
const users = []; // Gerçek projede DB kullanmalısın, şimdilik array

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword });
  res.json({ message: "Kayıt başarılı" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET || 'secret_key');
    return res.json({ token, message: "Giriş başarılı" });
  }
  res.status(401).json({ error: "Hatalı bilgiler" });
});

export default router;