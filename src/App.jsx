import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:5000/api/todos");
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!title) return;
    await axios.post("http://localhost:5000/api/todos", { title });
    setTitle("");
    fetchTodos();
  };

  const toggleTodo = async (id) => {
    await axios.put(`http://localhost:5000/api/todos/${id}`);
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    fetchTodos();
  };

  const clearAllTodos = async () => {
  try {
    await axios.delete("http://localhost:5000/api/todos/clear");
    fetchTodos();
  } catch (err) {
    console.error(err);
  }
};

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5">
      <h1 className="text-3xl font-bold mb-4">Todo App</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={addTodo} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>
      <button
  onClick={clearAllTodos}
  className="bg-red-600 text-white px-4 py-2 rounded mb-4"
>
  Clear All
</button>

      <ul className="w-full max-w-md">
        {todos.map((todo) => (
          <li key={todo.id} className="flex justify-between bg-white p-3 mb-2 rounded shadow">
            <span
              onClick={() => toggleTodo(todo.id)}
              className={todo.completed ? "line-through cursor-pointer" : "cursor-pointer"}
            >
              {todo.title}
            </span>
            
            <button onClick={() => deleteTodo(todo.id)} className="text-red-500">
              Delete
            </button>
          </li>
          
        ))}
      </ul>
    </div>
  );
}

export default App;