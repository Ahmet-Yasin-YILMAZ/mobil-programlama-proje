import { todoRepo } from "../data/todoRepo.memory.js";

export const addTodoUsecase = (title) => {
  if (!title || typeof title !== "string") {
    throw new Error("TITLE_REQUIRED");
  }

  const todo = {
    id: String(Date.now()),
    title: title.trim(),
    status: "OPEN",
  };

  return todoRepo.add(todo);
};
