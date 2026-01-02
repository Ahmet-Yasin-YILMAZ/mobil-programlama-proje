import { Router } from "express";
import { TodoManager } from "../business/TodoManager.js";
import OpenAI from "openai";

const router = Router();
const todoManager = new TodoManager();
const openai = new OpenAI({ apiKey: "YOUR_OPENAI_API_KEY" }); // Buraya kendi key'inizi yazın
let todos = []; 

// CLOUD AI SERVİSİ (Kürşat'ın Katmanı)
router.post("/ai-suggest", async (req, res) => {
  const { title } = req.body;
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "Todo maddesini 3 kelimelik kısa başlığa çevir." }, { role: "user", content: title }],
      model: "gpt-3.5-turbo",
    });
    const result = completion.choices[0].message.content;
    res.json({ suggestion: result || title }); // Boş gelirse orijinali döndür (Sıfırlamayı önler)
  } catch (err) {
    res.json({ suggestion: title }); // Hata olursa mevcut yazıyı koru
  }
});

// WEB SERVICE (Ahmet Yasin'in Katmanı)
router.get("/", (req, res) => res.json(todoManager.sortByDate(todos)));

router.post("/", (req, res) => {
  try {
    const { title, dueDate } = req.body;
    const newTask = todoManager.createTask(title, dueDate);
    const entry = { id: String(Date.now()), ...newTask };
    todos.push(entry);
    res.status(201).json(entry);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.delete("/:id", (req, res) => {
  todos = todos.filter(t => t.id !== req.params.id);
  res.status(204).send();
});

export default router;