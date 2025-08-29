import React, { useState, useEffect } from "react";
import LeftMenu from "../components/LeftMenu.jsx";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const getStartOfWeek = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
};

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const getMonthName = (date) =>
  date.toLocaleString("default", { month: "long" });

function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("Month");
  const [allEvents, setAllEvents] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("upcomingCards");
    const parsed = saved ? JSON.parse(saved) : [];
    setCards(parsed);

    const eventsFromStorage = parsed.flatMap((card) =>
      card.tasks.map((task) => ({
        ...task,
        start: new Date(task.start),
        end: new Date(task.end),
        color: task.color || "var(--list-personal)",
      }))
    );
    setAllEvents(eventsFromStorage);
  }, []);

  const todayTasks = cards.find((c) => c.id === "today")?.tasks.length || 0;
  const upcomingTasks = cards.reduce((sum, c) => sum + c.tasks.length, 0);

  const handlePrev = () => {
    if (view === "Day") setCurrentDate((prev) => addDays(prev, -1));
    if (view === "Week") setCurrentDate((prev) => addDays(prev, -7));
    if (view === "Month")
      setCurrentDate(
        (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
      );
  };

  const handleNext = () => {
    if (view === "Day") setCurrentDate((prev) => addDays(prev, 1));
    if (view === "Week") setCurrentDate((prev) => addDays(prev, 7));
    if (view === "Month")
      setCurrentDate(
        (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
      );
  };

  const handleToday = () => setCurrentDate(new Date());

  let headerTitle = "";
  if (view === "Day") {
    headerTitle = currentDate.toLocaleDateString("default", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } else if (view === "Week") {
    const start = getStartOfWeek(currentDate);
    const end = addDays(start, 6);
    headerTitle = `${start.getDate()} ${getMonthName(
      start
    )} - ${end.getDate()} ${getMonthName(end)}, ${end.getFullYear()}`;
  } else if (view === "Month") {
    headerTitle = `${getMonthName(currentDate)} ${currentDate.getFullYear()}`;
  }

  return (
    <div className="flex min-h-screen bg-(--color-bg) text-(--color-text)">
      {/* Sidebar */}
      <LeftMenu todayCount={todayTasks} upcomingCount={upcomingTasks} />

      <div className="flex-1 h-auto max-h-(--calendar-max-height) flex flex-col p-2 sm:p-4 lg:ml-74">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 bg-(--color-card-bg) rounded-t-lg border-b border-(--color-border)">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <button
              onClick={handleToday}
              className="border rounded px-3 py-1 ml-7 text-sm"
            >
              Today
            </button>
            <HiChevronLeft
              onClick={handlePrev}
              className="h-6 w-6 cursor-pointer"
            />
            <HiChevronRight
              onClick={handleNext}
              className="h-6 w-6 cursor-pointer"
            />
            <h2 className="text-lg sm:text-xl font-semibold">{headerTitle}</h2>
          </div>

          {/* View Switcher */}
          <div className="flex bg-(--btn-bg) rounded-md p-1 self-start sm:self-auto">
            {["Day", "Week", "Month"].map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-1 text-sm rounded ${
                  view === v ? "bg-(--btn-active-bg) shadow" : ""
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-(--color-card-bg) rounded-b-lg">
          {view === "Day" && <DayView date={currentDate} events={allEvents} />}
          {view === "Week" && <WeekView date={currentDate} events={allEvents} />}
          {view === "Month" && (
            <MonthView date={currentDate} events={allEvents} />
          )}
        </div>
      </div>
    </div>
  );
}

// --- Day View ---
const DayView = ({ date, events }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const dayEvents = events.filter((e) => {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    return e.start <= endOfDay && e.end >= startOfDay;
  });

  return (
    <div className="relative" style={{ height: "var(--week-height)" }}>
      {hours.map((hour) => (
        <div
          key={hour}
          className="flex border-t"
          style={{ height: "var(--day-hour-height)" }}
        >
          <div className="w-(--day-time-width) text-[10px] sm:text-xs text-right pr-1 sm:pr-2 pt-1 text-(--time-text)">
            {hour === 0
              ? "12 AM"
              : hour < 12
              ? `${hour} AM`
              : hour === 12
              ? "12 PM"
              : `${hour - 12} PM`}
          </div>
          <div className="flex-1 border-l border-(--color-border)"></div>
        </div>
      ))}
      {dayEvents.map((event) => {
        const top = event.start.getHours() * 60 + event.start.getMinutes();
        const height = (event.end - event.start) / (1000 * 60);
        return (
          <div
            key={event.id}
            style={{ top: `${top}px`, height: `${height}px` }}
            className="absolute left-(--day-time-width) right-1 sm:right-2 bg-(--list-personal) border border-(--day-border-color) p-1 rounded z-10"
          >
            <p className="text-[10px] sm:text-xs font-semibold">{event.text}</p>
          </div>
        );
      })}
    </div>
  );
};

// --- Week View ---
const WeekView = ({ date, events }) => {
  const weekStart = getStartOfWeek(date);
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <div className="grid grid-cols-7 text-[10px] sm:text-sm">
      {days.map((day) => (
        <div
          key={day}
          className="flex flex-col items-center border-l py-1 sm:py-2"
        >
          <p>{day.toLocaleDateString("default", { weekday: "short" })}</p>
          <p
            className={`font-bold ${
              day.toDateString() === new Date().toDateString()
                ? "bg-(--current-day-bg) text-(--color-background) rounded-full h-6 w-6 sm:h-8 sm:w-8 flex items-center justify-center"
                : ""
            }`}
          >
            {day.getDate()}
          </p>
        </div>
      ))}
      <div
        className="col-span-7 grid grid-cols-7 relative"
        style={{ height: "var(--week-height)" }}
      >
        {days.map((day, dayIndex) => (
          <div key={dayIndex} className="border-l">
            {events
              .filter((e) => {
                const startOfDay = new Date(day);
                startOfDay.setHours(0, 0, 0, 0);
                const endOfDay = new Date(day);
                endOfDay.setHours(23, 59, 59, 999);
                return e.start <= endOfDay && e.end >= startOfDay;
              })
              .map((event) => {
                const top =
                  event.start.getHours() * 60 + event.start.getMinutes();
                const height = (event.end - event.start) / (1000 * 60);
                return (
                  <div
                    key={event.id}
                    style={{
                      top: `${top}px`,
                      height: `${height}px`,
                      left: `${dayIndex * (100 / 7)}%`,
                      width: `${100 / 7}%`,
                    }}
                    className="absolute bg-(--week-event-bg) border border-(--week-event-border) p-1 rounded z-10 text-[10px] sm:text-xs overflow-hidden"
                  >
                    {event.text}
                  </div>
                );
              })}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Month View ---
const MonthView = ({ date, events }) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const blanks = Array(firstDay).fill(null);
  const daysArr = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="grid grid-cols-7 h-full text-[10px] sm:text-sm">
      {weekdays.map((day) => (
        <div
          key={day}
          className="text-center font-semibold border-b border-r p-1 sm:p-2"
        >
          {day}
        </div>
      ))}
      {blanks.map((_, i) => (
        <div key={`b-${i}`} className="border-b border-r"></div>
      ))}
      {daysArr.map((day) => {
        const currentDate = new Date(year, month, day);
        const dayEvents = events.filter((e) => {
          const startOfDay = new Date(currentDate);
          startOfDay.setHours(0, 0, 0, 0);
          const endOfDay = new Date(currentDate);
          endOfDay.setHours(23, 59, 59, 999);
          return e.start <= endOfDay && e.end >= startOfDay;
        });
        return (
          <div
            key={day}
            className="border-b border-r p-1 sm:p-2"
            style={{ minHeight: "var(--month-day-min-height)" }}
          >
            <p
              className={`${
                currentDate.toDateString() === new Date().toDateString()
                  ? "font-bold text-(--current-day-text)"
                  : ""
              }`}
            >
              {day}
            </p>
            <div className="flex flex-col gap-1 mt-1">
              {dayEvents.slice(0, 2).map((event) => (
                <div
                  key={event.id}
                  className="text-[10px] sm:text-xs bg-(--month-event-bg) rounded px-1 truncate"
                >
                  {event.text}
                </div>
              ))}
              {dayEvents.length > 2 && (
                <div className="text-[10px] sm:text-xs text-(--gray-600)">
                  +{dayEvents.length - 2} more
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CalendarPage;
