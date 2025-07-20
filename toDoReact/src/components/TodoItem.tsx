import { useState } from "react";

type Todo = {
  id: number;
  text: string;
  isDone: boolean;
};

type Props = {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: (newText: string) => void;
};

const TodoItem = ({ todo, onDelete, onToggle, onEdit }: Props) => {
  const [editMode, setEditMode] = useState(false);
/*************  ✨ Windsurf Command ⭐  *************/
/*******  b67b84ea-b9d3-4b3b-9f8f-b511d0792d23  *******/  const [editedText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (!editedText.trim()) return;
    setEditMode(false);
    onEdit(editedText); // pass the updated text
  };

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={todo.isDone}
        onChange={onToggle}
      />

      {editMode ? (
        <>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
            }}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <span
            style={{
              textDecoration: todo.isDone ? "line-through" : "none",
            }}
          >
            {todo.text}
          </span>
          <button onClick={() => setEditMode(true)}>Edit</button>
        </>
      )}

      <button onClick={onDelete}>X</button>
    </li>
  );
};

export default TodoItem;
