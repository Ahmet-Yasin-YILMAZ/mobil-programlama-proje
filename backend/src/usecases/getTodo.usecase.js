import { todoRepo } from "../data/todoRepo.memory.js";

export const getTodoUsecase = (id) => {
  const todo = todoRepo.findById(id);
  if (!todo) {
    throw new Error("NOT_FOUND");
  }
  return todo;
};
