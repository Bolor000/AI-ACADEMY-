"use client";

import { useState } from "react";

// Simple Login Form
function LoginForm({ onLogin }: { onLogin: (username: string) => void }) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username) onLogin(username);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-64 mx-auto mt-20"
    >
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 rounded"
      />
      <button className="bg-blue-500 text-white p-2 rounded">Login</button>
    </form>
  );
}

// Calendar component
function Calendar({
  onSelectMonth,
}: {
  onSelectMonth: (month: number) => void;
}) {
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  return (
    <div className="grid grid-cols-4 gap-2 mt-4">
      {months.map((m) => (
        <button
          key={m}
          onClick={() => onSelectMonth(m)}
          className="border p-4 hover:bg-blue-100 rounded"
        >
          {m} сарын calendar
        </button>
      ))}
    </div>
  );
}

// Days in month
function MonthDays({
  month,
  onSelectDay,
}: {
  month: number;
  onSelectDay: (day: number) => void;
}) {
  const daysInMonth = new Date(2025, month, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-7 gap-2 mt-4">
      {days.map((d) => (
        <button
          key={d}
          onClick={() => onSelectDay(d)}
          className="border h-20 w-20 flex items-center justify-center hover:bg-blue-100 rounded"
        >
          {d}
        </button>
      ))}
    </div>
  );
}

// Day schedule
function DaySchedule({ day }: { day: number }) {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  return (
    <div className="mt-4">
      <h3 className="font-bold">Schedule for day {day}</h3>
      <ul className="grid grid-cols-4 gap-2 mt-2">
        {hours.map((h) => (
          <li key={h} className="border p-2 rounded text-center">
            {h}:00
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Page() {
  const [user, setUser] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  if (!user) return <LoginForm onLogin={setUser} />;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Welcome, {user}</h1>
      {!selectedMonth && <Calendar onSelectMonth={setSelectedMonth} />}
      {selectedMonth && !selectedDay && (
        <MonthDays month={selectedMonth} onSelectDay={setSelectedDay} />
      )}
      {selectedDay && <DaySchedule day={selectedDay} />}
      {selectedDay && (
        <button
          className="mt-4 bg-gray-200 p-2 rounded"
          onClick={() => setSelectedDay(null)}
        >
          Back to month
        </button>
      )}
      {selectedMonth && !selectedDay && (
        <button
          className="mt-4 bg-gray-200 p-2 rounded"
          onClick={() => setSelectedMonth(null)}
        >
          Back to year
        </button>
      )}
    </div>
  );
}
