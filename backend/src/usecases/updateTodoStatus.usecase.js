import { todoRepo } from "../data/todoRepo.memory.js";

export const updateTodoStatusUsecase = (id, status) => {
  const valid = ["OPEN", "DONE"];
  if (!valid.includes(status)) {
    throw new Error("INVALID_STATUS");
  }

  const updated = todoRepo.updateStatus(id, status);
  if (!updated) {
    throw new Error("NOT_FOUND");
  }

  return updated;
};
