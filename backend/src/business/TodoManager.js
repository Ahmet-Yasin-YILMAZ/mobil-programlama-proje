/**
 * Business Layer: OOP Components [cite: 12]
 * Bu sınıf, görevlerin iş mantığını ve doğrulama kurallarını yönetir.
 */
class Task {
  constructor(title, priority = 'NORMAL') {
    this.title = title;
    this.priority = priority;
    this.createdAt = new Date();
  }
}

export class TodoManager {
  constructor() {
    this.minTitleLength = 3;
  }

  // Abstraction & Encapsulation örneği
  validateTask(title) {
    if (!title || title.trim().length < this.minTitleLength) {
      throw new Error(`Görev başlığı en az ${this.minTitleLength} karakter olmalıdır.`);
    }
    return true;
  }

  createTaskObject(title, priority) {
    this.validateTask(title);
    return new Task(title.trim(), priority);
  }

  // İş mantığı: Görevlerin önem sırasına göre işlenmesi
  processTask(task) {
    console.log(`[Business Layer] İşleniyor: ${task.title} (Öncelik: ${task.priority})`);
    return {
      ...task,
      processedAt: new Date(),
      status: 'VALIDATED'
    };
  }
}