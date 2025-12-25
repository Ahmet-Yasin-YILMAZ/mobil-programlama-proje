import { createTodo } from "../domain/todo.js";

export function listTodos() {
  return [createTodo({ id: "1", title: "Hello" })];
}
