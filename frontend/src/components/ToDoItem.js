import React, { useState } from "react";

const ToDoItem = ({ todo, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleSave = () => {
    onEdit(todo._id, editTitle);
    setIsEditing(false);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        margin: "8px 0",
        padding: "8px 12px",
        background: "#fff",
        borderRadius: 6,
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      {isEditing ? (
        <>
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            style={{ flex: 1, padding: 6 }}
          />
          <button
            onClick={handleSave}
            style={{
              padding: "6px 12px",
              borderRadius: 4,
              border: "1px solid #28a745",
              background: "#28a745",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Enregistrer
          </button>
          <button
            onClick={() => setIsEditing(false)}
            style={{
              padding: "6px 12px",
              borderRadius: 4,
              border: "1px solid #6c757d",
              background: "#6c757d",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Annuler
          </button>
        </>
      ) : (
        <>
          <span style={{ flex: 1 }}>{todo.title}</span>
          <button
            onClick={() => setIsEditing(true)}
            style={{
              padding: "6px 12px",
              borderRadius: 4,
              border: "1px solid #ffc107",
              background: "#ffc107",
              color: "#333",
              cursor: "pointer",
            }}
          >
            Modifier
          </button>
          <button
            onClick={() => onDelete(todo._id)}
            style={{
              padding: "6px 12px",
              borderRadius: 4,
              border: "1px solid #dc3545",
              background: "#dc3545",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Supprimer
          </button>
        </>
      )}
    </div>
  );
};

export default ToDoItem;
