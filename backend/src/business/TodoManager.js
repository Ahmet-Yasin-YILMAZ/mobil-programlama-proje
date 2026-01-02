import { z } from 'zod';

class Task {
  constructor(title, dueDate, priority = 'NORMAL') {
    this.title = title;
    this.dueDate = dueDate || new Date().toISOString().split('T')[0];
    this.priority = priority;
    this.status = 'OPEN';
    this.createdAt = new Date();
  }
}

export class TodoManager {
  constructor() {
    this.schema = z.object({
      title: z.string().min(3, "Başlık en az 3 karakter olmalı"),
      dueDate: z.string().refine((val) => !isNaN(new Date(val).getTime()), {
        message: "Geçersiz tarih!" // Ayın 35'i gibi hataları engeller
      })
    });
  }

  createTask(title, dueDate, priority) {
    const validated = this.schema.parse({ title, dueDate });
    return new Task(validated.title, validated.dueDate, priority);
  }

  sortByDate(todos) {
    return [...todos].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  }
}