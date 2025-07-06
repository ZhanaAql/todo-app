import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
const CalendarView = ({
  todos,
  currentDate,
  setCurrentDate,
  setSelectedDate,
  selectedDate,
}) => {
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

  const handleDateClick = (day) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );

    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const aDay = String(newDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${aDay}`;

    setSelectedDate(formattedDate); // Gunakan tanggal yang sudah diformat
    setCurrentDate(newDate);
  };

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() 0-indexed, jadi +1
      const aDay = String(date.getDate()).padStart(2, "0");
      const dateString = `${year}-${month}-${aDay}`;
      const isToday = date.toDateString() === today.toDateString();
      const isSelected = selectedDate === dateString; // Check if this day is selected
      const hasTask = taskDates.has(dateString);

      let dayClass = isToday
        ? "bg-indigo-600 text-white font-bold" // Full fill for today
        : isSelected
        ? "border-2 border-blue-500 text-blue-500 font-bold" // Border for selected day
        : "text-gray-700 hover:bg-blue-100"; // Default for other days

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
            onClick={() => handleDateClick(day)}
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
