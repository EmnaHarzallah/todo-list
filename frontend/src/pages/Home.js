import React, { useState, useEffect } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../api";
import ToDoItem from "../components/ToDoItem";
import axios from "axios";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/todos", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTodos(res.data);
    } catch (err) {
      // Handle error (e.g., redirect to login if 401)
      console.error(err);
    }
  };

  const handleAdd = async () => {
    if (!title.trim()) return; // Prevent empty todos
    try {
      await axios.post(
        "http://localhost:5000/api/todos",
        { title },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTitle(""); // Clear input
      fetchTodos(); // Refresh the list
    } catch (err) {
      console.error(err);
      // Optionally show an error message to the user
    }
  };

  const handleEdit = async (id, newTitle) => {
    try {
      await axios.put(
        `http://localhost:5000/api/todos/${id}`,
        { title: newTitle },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchTodos(); // Refresh the list after editing
    } catch (err) {
      console.error(err);
      // Optionally show an error message or redirect to login
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchTodos(); // Refresh the list after deletion
    } catch (err) {
      console.error(err);
      // Optionally show an error message or redirect to login
    }
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
