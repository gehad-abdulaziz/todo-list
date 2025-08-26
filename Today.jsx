import React, { useState, useEffect } from "react";
import { useLoaderData, Form, redirect } from "react-router-dom";
import LeftMenu from "../components/LeftMenu.jsx";

export async function loader() {
  const saved = localStorage.getItem("upcomingCards");
  const cards = saved ? JSON.parse(saved) : [];
  const todayCard =
    cards.find((c) => c.id === "today") || { id: "today", title: "Today", tasks: [] };
  return { todayCard };
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const saved = localStorage.getItem("upcomingCards");
  let cards = saved ? JSON.parse(saved) : [];
  const cardId = "today";

  if (data.intent === "deleteTask") {
    cards = cards.map((c) =>
      c.id === cardId
        ? { ...c, tasks: c.tasks.filter((t) => t.id.toString() !== data.taskId) }
        : c
    );
  }

  localStorage.setItem("upcomingCards", JSON.stringify(cards));
  return redirect("/today");
}

function Today() {
  const loaderData = useLoaderData();
  const [todayCard, setTodayCard] = useState(loaderData.todayCard);
  const [newTaskText, setNewTaskText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [upcomingCount, setUpcomingCount] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("upcomingCards");
    if (saved) {
      const cards = JSON.parse(saved);
      const today = cards.find((c) => c.id === "today");
      if (today) setTodayCard(today);

      const upcomingTasksCount = cards
        .filter((c) => c.id !== "today")
        .reduce((sum, c) => sum + c.tasks.length, 0);

      setUpcomingCount(upcomingTasksCount);
    }
  }, []);

  const toggleTask = (taskId) => {
    const updatedTasks = todayCard.tasks.map((t) =>
      t.id === taskId ? { ...t, done: !t.done } : t
    );
    const updatedCard = { ...todayCard, tasks: updatedTasks };
    setTodayCard(updatedCard);

    const saved = localStorage.getItem("upcomingCards");
    let cards = saved ? JSON.parse(saved) : [];
    cards = cards.map((c) => (c.id === "today" ? updatedCard : c));
    localStorage.setItem("upcomingCards", JSON.stringify(cards));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim() || !startDate || !startTime || !endDate || !endTime) return;

    const newTask = {
      id: Date.now(),
      text: newTaskText,
      done: false,
      start: new Date(`${startDate}T${startTime}`).toISOString(),
      end: new Date(`${endDate}T${endTime}`).toISOString(),
    };

    const updatedCard = { ...todayCard, tasks: [...todayCard.tasks, newTask] };
    setTodayCard(updatedCard);
    setNewTaskText("");
    setStartDate("");
    setStartTime("");
    setEndDate("");
    setEndTime("");

    const saved = localStorage.getItem("upcomingCards");
    let cards = saved ? JSON.parse(saved) : [];
    if (!cards.find((c) => c.id === "today"))
      cards.push({ id: "today", title: "Today", tasks: [] });
    cards = cards.map((c) => (c.id === "today" ? updatedCard : c));
    localStorage.setItem("upcomingCards", JSON.stringify(cards));
  };

  const todayTasks = todayCard.tasks.length;

  return (
    <div className="min-h-screen justify-start items-start gap-4 text-(--color-text)">
      <LeftMenu todayCount={todayTasks} upcomingCount={upcomingCount} />

      <div className="flex-1 mx-4 mt-4 min-h-168 rounded-3xl p-8 text-center flex flex-col gap-6 lg:ml-72 lg:mr-0 lg:h-auto lg:p-10 w-full max-w-[80%]">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Today</h1>
          <div className="rounded-full px-4 py-2 text-sm font-medium bg-(--color-badge-bg)">
            {todayTasks}
          </div>
        </div>

        <div className="rounded-2xl border p-6 shadow-sm bg-(--color-card-bg) border-(--color-border)">
          <h2 className="font-bold text-2xl mb-4">{todayCard.title}</h2>

          <form onSubmit={handleAddTask} className="flex flex-col gap-2 mb-4">
            <input
              type="text"
              placeholder="Add new task"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 border-(--color-border) focus:ring-(--color-primary-light)"
            />
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-sm">Start Date & Time</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-2 border rounded mb-1"
                />
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="text-sm">End Date & Time</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-2 border rounded mb-1"
                />
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full text-center py-2 border rounded-lg mt-2 hover:bg-(--gray-100) transition"
            >
              + Add new task
            </button>
          </form>

          {/* Tasks List */}
          <div className="flex flex-col gap-3">
            {todayCard.tasks.length === 0 && (
              <p className="text-sm text-(--gray-500) italic">No tasks yet</p>
            )}
            {todayCard.tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between border-b pb-2 border-(--color-border)"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(task.id)}
                  />
                  <span
                    className={
                      task.done
                        ? "line-through text-(--color-muted-text)"
                        : "font-medium"
                    }
                  >
                    {task.text}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-(--gray-500)">
                    {new Date(task.start).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    -{" "}
                    {new Date(task.end).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <button
                    onClick={() => {
                      const updatedCard = {
                        ...todayCard,
                        tasks: todayCard.tasks.filter((t) => t.id !== task.id),
                      };
                      setTodayCard(updatedCard);
                      const saved = localStorage.getItem("upcomingCards");
                      let cards = saved ? JSON.parse(saved) : [];
                      cards = cards.map((c) =>
                        c.id === "today" ? updatedCard : c
                      );
                      localStorage.setItem(
                        "upcomingCards",
                        JSON.stringify(cards)
                      );
                    }}
                    className="text-(--color-danger) text-xs font-semibold hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Today;
