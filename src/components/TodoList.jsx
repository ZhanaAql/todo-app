import React from 'react';
import { Plus } from 'lucide-react';
import TodoItem from "./TodoItem.jsx";

function TodoList({ todos, handleOpenAddModal, handleEditTodo, handleDeleteTodo }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full lg:w-2/3">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Daftar Tugas</h2>
        <button
          onClick={handleOpenAddModal} // Membuka modal untuk menambah tugas
          className="flex items-center gap-2 bg-indigo-600 text-white font-semibold px-5 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <Plus className="h-5 w-5" />
          Tambah Baru
        </button>
      </header>

      {/* Menampilkan daftar tugas */}
      <div className="space-y-4">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onEdit={handleEditTodo} // Menyediakan fungsi edit
              onDelete={handleDeleteTodo} // Menyediakan fungsi delete
              formatDisplayDate={(date) => new Date(date).toLocaleString()}
            />
          ))
        ) : (
          <div className="text-center py-12 px-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-medium text-gray-700">Tidak ada jadwal</h3>
            <p className="text-gray-500 mt-2">Mulai dengan menambahkan jadwal baru!</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default TodoList;
