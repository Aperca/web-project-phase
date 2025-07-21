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
  const [editedText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (!editedText.trim()) return;
    setEditMode(false);
    onEdit(editedText); 
  };

  return (
    <li className="bg-white shadow p-3 mb-2 rounded flex items-center justify-between">
      <div className="flex items-center space-x-3 flex-grow">
        <input
          type="checkbox"
          checked={todo.isDone}
          onChange={onToggle}
          className="h-5 w-5 rounded text-blue-500 focus:ring-blue-500"
        />

        {editMode ? (
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
            }}
            className="flex-grow px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        ) : (
          <span
            className={`flex-grow ${todo.isDone ? "line-through text-gray-400" : ""}`}
          >
            {todo.text}
          </span>
        )}
      </div>

      <div className="flex items-center space-x-2 ml-4">
        {editMode ? (
          <button 
            onClick={handleSave} 
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"          >
            Save
          </button>
        ) : (
          <button 
            onClick={() => setEditMode(true)} 
            className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"          >
            Edit
          </button>
        )}
        <button 
          onClick={onDelete} 
          className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"        >
          X
        </button>
      </div>
    </li>
  );
};

export default TodoItem;