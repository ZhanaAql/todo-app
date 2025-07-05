import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CalendarView = ({ todos, currentDate, setCurrentDate }) => {
  const today = new Date();
  const daysOfWeek = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

  // Set untuk tugas-tugas pada tanggal tertentu
  const taskDates = new Set(todos.map((todo) => todo.date.split("T")[0]));

  // Menentukan tanggal pertama dan terakhir dalam bulan ini
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const startingDay = firstDayOfMonth.getDay();
  const totalDays = lastDayOfMonth.getDate();

  const goToPreviousMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );

  const goToNextMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );

  const goToToday = () => setCurrentDate(new Date());

  // Fungsi untuk menangani pemilihan tanggal
  const handleDateClick = (day) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setCurrentDate(newDate); // Update currentDate ke tanggal yang dipilih
  };

  const renderDays = () => {
    const days = [];
    // Tambahkan sel kosong untuk hari-hari sebelum tanggal pertama bulan ini
    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Menampilkan setiap tanggal dalam bulan ini
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const dateString = date.toISOString().split("T")[0]; // Mengambil hanya tanggal (YYYY-MM-DD)
      const isToday = date.toDateString() === today.toDateString(); // Cek apakah tanggal ini adalah hari ini
      const hasTask = taskDates.has(dateString); // Cek apakah tanggal ini ada tugas

      // Menambahkan gaya untuk tanggal yang dipilih atau hari ini
      let dayClass = isToday
        ? "bg-indigo-600 text-white font-bold" // Gaya untuk hari ini (background biru penuh)
        : "text-gray-700 hover:bg-blue-100"; // Gaya untuk tanggal lain (lingkaran biru dengan teks abu-abu)

      // Menampilkan tanggal dengan lingkaran biru jika ada tugas
      let taskMarker = hasTask && !isToday && (
        <div className="absolute mt-6 w-1 h-1 bg-green-500 rounded-full"></div>
      );

      days.push(
        <div
          key={day}
          className="flex justify-center items-center p-1 relative"
        >
          <div
            className={`w-9 h-9 flex justify-center items-center rounded-full cursor-pointer transition-colors relative ${dayClass}`}
            onClick={() => handleDateClick(day)} // Menangani klik tanggal
          >
            <span>{day}</span>
            {taskMarker}
          </div>
        </div>
      );
    }
    return days;
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full lg:w-1/3">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          {currentDate.toLocaleString("id-ID", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={goToToday}
            className="text-sm font-semibold text-gray-600 border border-gray-300 px-3 py-1 rounded-md hover:bg-gray-100"
          >
            Hari Ini
          </button>
          <button
            onClick={goToPreviousMonth}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={goToNextMonth}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-500 mb-2">
        {daysOfWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">{renderDays()}</div>
    </div>
  );
};

export default CalendarView;
