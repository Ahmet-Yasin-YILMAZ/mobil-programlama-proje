import { Router } from "express";

const router = Router();

// In-memory (Data Layer branch'inde MongoDB'ye bağlanacak) [cite: 13]
let todos = [{ id: "1", title: "Hello", status: "OPEN" }];

// GET /todos -> Hepsini listele
router.get("/", (req, res) => {
  res.json(todos);
});

// POST /todos -> Yeni todo ekle
router.post("/", (req, res) => {
  const { title } = req.body || {};
  if (!title || typeof title !== "string" || !title.trim()) {
    return res.status(400).json({ error: "title is required" });
  }

  const newTodo = {
    id: String(Date.now()),
    title: title.trim(),
    status: "OPEN",
  };

  todos.push(newTodo);
  return res.status(201).json(newTodo);
});

// PATCH /todos/:id -> Sadece başlık güncelle
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body || {};

  if (typeof title !== "string" || !title.trim()) {
    return res.status(400).json({ error: "title must be a non-empty string" });
  }

  const idx = todos.findIndex((t) => t.id === id);
  if (idx === -1) return res.status(404).json({ error: "todo not found" });

  todos[idx] = { ...todos[idx], title: title.trim() };
  return res.json(todos[idx]);
});

// PATCH /todos/:id/status -> Durum güncelle (OPEN/DONE)
router.patch("/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body || {};

  if (status !== "OPEN" && status !== "DONE") {
    return res.status(400).json({ error: "status must be OPEN or DONE" });
  }

  const idx = todos.findIndex((t) => t.id === id);
  if (idx === -1) return res.status(404).json({ error: "todo not found" });

  todos[idx] = { ...todos[idx], status };
  return res.json(todos[idx]);
});

// DELETE /todos/:id -> Sil
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const before = todos.length;
  todos = todos.filter((t) => t.id !== id);
  if (todos.length === before) return res.status(404).json({ error: "todo not found" });
  return res.status(204).send();
});

export default router;