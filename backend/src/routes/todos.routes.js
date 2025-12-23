import { Router } from "express";

const router = Router();

// Geçici in-memory liste
let todos = [{ id: "1", title: "Hello", status: "OPEN" }];

// GET /todos -> hepsini listele
router.get("/", (req, res) => {
  res.json(todos);
});

// POST /todos -> yeni todo ekle
router.post("/", (req, res) => {
  const { title } = req.body || {};
  if (!title || typeof title !== "string") {
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

// PATCH /todos/:id/status -> status güncelle
router.patch("/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body || {};

  if (!["OPEN", "DONE"].includes(status)) {
    return res.status(400).json({ error: "invalid status" });
  }

  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: "todo not found" });
  }

  todo.status = status;
  return res.json(todo);
});

// DELETE /todos/:id -> sil
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const before = todos.length;

  todos = todos.filter((t) => t.id !== id);

  if (todos.length === before) {
    return res.status(404).json({ error: "todo not found" });
  }

  return res.status(204).send();
});

export default router;
