import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);

  const toastHandler = (message) => {
    return toast(message);
  };

  const addTodoHandler = () => {
    if (!input.trim()) {
      return toastHandler("Please Enter a Task");
    }

    if (todos) {
      const existingTodo = todos.map((item) => item.title.includes(input));
      // console.log(existingTodo);

      if (existingTodo[0]) {
        return toastHandler("this is item already in list");
      }
    }

    if (editTodo) {
      const updateTodos = todos.map((todo) =>
        todo.id == editTodo ? { ...todo, title: input } : todo
      );

      setTodos(updateTodos);
      setEditTodo(null);
      setInput("");
      return toastHandler("item Updated");
    }

    const todoItem = {
      title: input,
      id: Date.now(),
    };

    setTodos((prev) => [...prev, todoItem]);

    setInput("");
  };

  const editTodoHandler = (id) => {
    let editItem = todos.find((item) => item.id == id);
    setEditTodo(editItem.id);
    setInput(editItem.title);
  };

  const deleteTodoHandler = (id) => {
    // console.log(id);

    let deleteTodo = todos.filter((item) => item.id !== id);

    setTodos(deleteTodo);
  };

  // console.log("todos array -->", todos);

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-950 px-4 py-8">
      <div className="w-full max-w-lg bg-[#111c32] border border-[#243554] rounded-3xl shadow-2xl p-5 sm:p-7">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            📝 Todo Application
          </h1>

          <p className="text-sm pl-2 text-slate-400 mt-1">
             ✅ Add Your Task below.
          </p>
        </div>

        {/* Input Area */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="What do you need to do?"
            className="flex-1 h-12 bg-[#0b1120] border border-[#2b3d5c] rounded-xl px-4 text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />

          <button
            onClick={addTodoHandler}
            className="h-12 px-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl cursor-pointer transition shadow-lg shadow-blue-900/20"
          >
            {editTodo ? "Update" : "Add Task"}
          </button>
        </div>

        {/* Todo List */}
        <div>
          {todos.length > 0 ? (
            todos.map((todo) => (
              <TodoItem
                deleteTodoHandler={deleteTodoHandler}
                editTodoHandler={editTodoHandler}
                key={todo.id}
                todo={todo}
              />
            ))
          ) : (
            <div className="text-center border border-dashed border-[#2b3d5c] rounded-2xl py-10 px-4">
              <div className="text-4xl mb-3">📋</div>

              <p className="text-white font-medium">
                No Todos Yet
              </p>

              <p className="text-sm text-slate-500 mt-1">
                Add your first task above.
              </p>
            </div>
          )}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default App;

const TodoItem = ({ todo, editTodoHandler, deleteTodoHandler }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 mb-3 bg-[#0b1120] border border-[#243554] rounded-2xl hover:border-[#36527c] transition">

      {/* Todo Text */}
      <h1 className="text-white text-sm sm:text-base break-words flex-1">
        {todo.title}
      </h1>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          className="px-3 py-2 text-sm text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg cursor-pointer transition"
          onClick={() => editTodoHandler(todo.id)}
        >
          Edit
        </button>

        <button
          className="px-3 py-2 text-sm text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-lg cursor-pointer transition"
          onClick={() => deleteTodoHandler(todo.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};