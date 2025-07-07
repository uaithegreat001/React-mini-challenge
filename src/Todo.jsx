import { useEffect, useState } from "react";

export default function Todo() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(function () {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleChange(event) {
    setInput(event.target.value);
  }

  function addTodo() {
    if (input.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        text: input,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInput("");
    }
  }

  function toggleComplete(id) {
    const updatedTodos = todos.map(function (todo) {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  function deleteTodo(id) {
    const filteredTodos = todos.filter(function (todo) {
      return todo.id !== id;
    });
    setTodos(filteredTodos);
  }

  return (
    <div className="todo">
      <div className="todo-input">
        <input
          type="text"
          value={input}
          placeholder="Add new todo item"
          onChange={handleChange}
        />
        <button className="add-item" onClick={addTodo}>
          Add
        </button>
      </div>

      <div className="todo-items">
        {todos.length === 0 ? (
          <p className="no-item">No todos yet! Add some tasks!</p>
        ) : (
          todos.map(function (todo) {
            return (
              <div key={todo.id} className="todo-item">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={function () {
                    toggleComplete(todo.id);
                  }}
                />
                <span
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.text}
                </span>
                <div className="delete-todo"
                  onClick={function () {
                    deleteTodo(todo.id);
                  }}
                >
                  🗑️
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
