import React, { useState } from "react";

const DateSelector = ({ setYearMonthDay }) => {
  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const [selectedMonth, setSelectedMonth] = useState("01");
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedDay, setSelectedDay] = useState("01");

  function handleChange(m,d,y){
    const stringday = y+m+d;
    setYearMonthDay(stringday);
  }

  const getDaysInMonth = (month, year) => {
    return new Date(year, parseInt(month), 0).getDate(); // 0 gives last day of previous month
  };

  const daysInSelectedMonth = getDaysInMonth(selectedMonth, selectedYear);
  const days = Array.from({ length: daysInSelectedMonth }, (_, i) => {
    const value = String(i + 1).padStart(2, "0");
    return { value, label: i + 1 };
  });

  return (
    <div className="flex flex-row gap-2 m-5">
      <select
        name="year"
        id="year"
        value={selectedYear}
        onChange={(e) => {
            setSelectedYear(e.target.value);
            handleChange(selectedMonth, selectedDay, e.target.value);
        }}
      >
        {[2023, 2024, 2025, 2026].map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      {/* Month Select */}
      <select
        name="month"
        id="month"
        value={selectedMonth}
        onChange={(e) => {
            setSelectedMonth(e.target.value);
            handleChange(e.target.value, selectedDay, selectedYear);
        }}
      >
        {months.map((month) => (
          <option key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </select>

      {/* Day Select */}
      <select name="day" id="day"
        onChange={(e) => {
            setSelectedDay(e.target.value);
            handleChange(selectedMonth, e.target.value, selectedYear);
        }}>
        {days.map((day) => (
          <option key={day.value} value={day.value}>
            {day.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DateSelector;
