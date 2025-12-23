import { Router } from "express";

const router = Router();

// Basit stub – bu branch'te sadece çalışsın yeter
let todos = [{ id: "1", title: "Hello from stub", status: "OPEN" }];

router.get("/", (req, res) => {
  return res.json(todos);
});

export default router;
