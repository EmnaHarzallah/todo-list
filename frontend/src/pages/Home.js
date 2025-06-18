import React, { useState, useEffect } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../api";
import ToDoItem from "../components/ToDoItem";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await getTodos();
    setTodos(res.data);
  };

  const handleAdd = async () => {
    if (!title.trim()) return;
    await createTodo({ title: title.trim() });
    setTitle("");
    fetchTodos();
  };

  const handleEdit = async (id, newTitle) => {
    if (!newTitle.trim()) return;
    await updateTodo(id, { title: newTitle.trim() });
    fetchTodos();
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    fetchTodos();
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "40px auto",
        padding: 24,
        background: "#f9f9f9",
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <h1 style={{ textAlign: "center" }}>To-Do List</h1>
      <div style={{ display: "flex", marginBottom: 16 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ajouter un todo"
          style={{
            flex: 1,
            padding: 8,
            borderRadius: 4,
            border: "1px solid #ccc",
            marginRight: 8,
          }}
        />
        <button
          onClick={handleAdd}
          style={{
            padding: "8px 16px",
            borderRadius: 4,
            border: "1px solid #007bff",
            background: "#007bff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>
      <div>
        {todos.map((todo) => (
          <ToDoItem
            key={todo._id}
            todo={todo}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
