import { todoRepo } from "../data/todoRepo.memory.js";

export const deleteTodoUsecase = (id) => {
  const deleted = todoRepo.deleteById(id);
  if (!deleted) {
    throw new Error("NOT_FOUND");
  }
  return true;
};
