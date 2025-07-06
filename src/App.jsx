// src/App.jsx

import React, { useState, useEffect, useRef } from "react"; // 1. IMPORT useRef
import CalendarView from "./components/CalendarView";
import TodoList from "./components/TodoList";
import { loadTodos, saveTodos } from "./utils/storage";

export default function App() {
  const [todos, setTodos] = useState(loadTodos());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskText, setTaskText] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [currentTodo, setCurrentTodo] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // 2. BUAT REF UNTUK MENANDAI RENDER AWAL
  const isInitialMount = useRef(true);

  // 3. MODIFIKASI useEffect UNTUK MENYIMPAN DATA
  useEffect(() => {
    // JIKA INI ADALAH RENDER PERTAMA...
    if (isInitialMount.current) {
      // UBAH TANDANYA MENJADI FALSE DAN JANGAN LAKUKAN APA-APA
      isInitialMount.current = false;
    } else {
      // JIKA BUKAN RENDER PERTAMA, BARULAH SIMPAN DATA
      saveTodos(todos);
    }
  }, [todos]); // Efek ini tetap bergantung pada 'todos'

  const handleOpenAddModal = () => {
    setTaskText("");
    setTaskDate("");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentTodo(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskText.trim() || !taskDate) return;

    const formattedDate = taskDate.split("T")[0];

    if (currentTodo) {
      setTodos(
        todos
          .map((todo) =>
            todo.id === currentTodo.id
              ? { ...todo, text: taskText, date: formattedDate }
              : todo
          )
          .sort((a, b) => new Date(a.date) - new Date(b.date))
      );
    } else {
      const newTodo = {
        id: Date.now(),
        text: taskText,
        date: formattedDate,
        completed: false,
      };
      setTodos(
        [...todos, newTodo].sort((a, b) => new Date(a.date) - new Date(b.date))
      );
    }

    const localDateString = formattedDate.replace(/-/g, "/");
    const newNavigationDate = new Date(localDateString);

    setCurrentDate(newNavigationDate);
    setSelectedDate(formattedDate);

    handleCloseModal();
  };

  const handleEditTodo = (todo) => {
    setCurrentTodo(todo);
    setTaskText(todo.text);
    setTaskDate(todo.date);
    setIsModalOpen(true);
  };

  const handleDeleteTodo = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus tugas ini?")) {
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  const filteredTodos = selectedDate
    ? todos.filter((todo) => todo.date === selectedDate)
    : todos;

  return (
    <div className="bg-gray-100 min-h-screen font-sans flex items-center justify-center p-4 lg:p-8">
      <div className="w-full max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">To-do List App</h1>
        </header>
        <div className="flex flex-col lg:flex-row gap-8">
          <CalendarView
            todos={todos}
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            setSelectedDate={setSelectedDate}
            selectedDate={selectedDate}
          />
          <TodoList
            todos={filteredTodos}
            handleOpenAddModal={handleOpenAddModal}
            handleEditTodo={handleEditTodo}
            handleDeleteTodo={handleDeleteTodo}
          />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {currentTodo ? "Edit Jadwal" : "Tambah Jadwal Baru"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="taskText"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Deskripsi
                  </label>
                  <input
                    id="taskText"
                    type="text"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Contoh: Wawancara dengan HR"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="taskDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Tanggal & Waktu
                  </label>
                  <input
                    id="taskDate"
                    type="datetime-local"
                    value={taskDate}
                    onChange={(e) => setTaskDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>
              <div className="mt-8 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700"
                >
                  {currentTodo ? "Simpan" : "Tambah"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
