// In-memory Todo Repository
let todos = [{ id: "1", title: "Hello", status: "OPEN" }];

export const todoRepo = {
  list() {
    return todos;
  },

  add(todo) {
    todos.push(todo);
    return todo;
  },

  findById(id) {
    return todos.find((t) => t.id === id) || null;
  },

  updateStatus(id, newStatus) {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return null;
    todo.status = newStatus;
    return todo;
  },

  deleteById(id) {
    const before = todos.length;
    todos = todos.filter((t) => t.id !== id);
    return todos.length !== before;
  }
};
