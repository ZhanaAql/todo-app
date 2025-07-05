import React from "react";
import { Edit, Trash2, Pencil } from "lucide-react"; // Menggunakan ikon dari lucide-react

const TodoItem = ({ todo, onEdit, onDelete, formatDisplayDate }) => (
  <div
    className="bg-white border-l-4 p-4 rounded-r-lg flex items-center"
    style={{ borderColor: todo.color }}
  >
    <div className="flex-grow">
      <p className="font-semibold text-gray-800">
        {formatDisplayDate(todo.date)}
      </p>
      <p className="text-gray-600">{todo.text}</p>
    </div>
    <div className="flex items-center gap-3 ml-4">
      <button
        onClick={() => onEdit(todo)} // Memanggil fungsi onEdit untuk edit
        className="text-gray-400 hover:text-blue-500"
      >
        <Pencil className="h-5 w-5" />
      </button>
      <button
        onClick={() => onDelete(todo.id)} // Memanggil fungsi onDelete untuk delete
        className="text-gray-400 hover:text-red-500"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  </div>
);

export default TodoItem;
