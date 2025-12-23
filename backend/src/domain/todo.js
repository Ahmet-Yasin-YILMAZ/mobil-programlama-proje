export const TodoStatus = { OPEN: "OPEN", DONE: "DONE" };

export function createTodo({ id, title, status = TodoStatus.OPEN }) {
  return { id, title, status };
}
