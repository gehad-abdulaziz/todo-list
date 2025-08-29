import React, { useState, useEffect } from "react"; 
import { useLoaderData, Form, redirect } from "react-router-dom";
import LeftMenu from "../components/LeftMenu.jsx";

const initialCards = [
  { id: "today", title: "Today", tasks: [] },
  { id: "tomorrow", title: "Tomorrow", tasks: [] },
  { id: "week", title: "This Week", tasks: [] },
];

export function loader() {
  const saved = localStorage.getItem("upcomingCards");
  let cards = saved ? JSON.parse(saved) : initialCards;

  const ids = cards.map((c) => c.id);
  initialCards.forEach((defaultCard) => {
    if (!ids.includes(defaultCard.id)) {
      cards.push(defaultCard);
    }
  });

  return { cards };
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const intent = data.intent;

  const saved = localStorage.getItem("upcomingCards");
  let cards = saved ? JSON.parse(saved) : initialCards;

  const ids = cards.map((c) => c.id);
  initialCards.forEach((defaultCard) => {
    if (!ids.includes(defaultCard.id)) {
      cards.push(defaultCard);
    }
  });

  if (intent === "addTask") {
    const { cardId, text, startDate, startTime, endDate, endTime, category } = data;
    if (!text.trim() || !startDate || !startTime || !endDate || !endTime || !category) return null;

    const newTask = {
      id: Date.now(),
      text,
      done: false,
      start: new Date(`${startDate}T${startTime}`).toISOString(),
      end: new Date(`${endDate}T${endTime}`).toISOString(),
      category: JSON.parse(category),
    };

    cards = cards.map((c) =>
      c.id === cardId ? { ...c, tasks: [...c.tasks, newTask] } : c
    );
  }

  if (intent === "toggleTask") {
    const { cardId, taskId } = data;
    cards = cards.map((c) =>
      c.id === cardId
        ? {
            ...c,
            tasks: c.tasks.map((t) =>
              t.id.toString() === taskId ? { ...t, done: !t.done } : t
            ),
          }
        : c
    );
  }

  if (intent === "deleteTask") {
    const { cardId, taskId } = data;
    cards = cards.map((c) =>
      c.id === cardId ? { ...c, tasks: c.tasks.filter((t) => t.id.toString() !== taskId) } : c
    );
  }

  localStorage.setItem("upcomingCards", JSON.stringify(cards));
  return redirect("/upcoming");
}

function Upcoming() {
  const { cards } = useLoaderData();
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const savedLists = localStorage.getItem("lists");
    if (savedLists) {
      setLists(JSON.parse(savedLists));
    }
  }, []);

  const todayTasks = cards.find((c) => c.id === "today")?.tasks.length || 0;
  const upcomingTasks = cards.filter((c) => c.id !== "today").reduce((sum, c) => sum + c.tasks.length, 0);
  const totalTasks = cards.reduce((sum, c) => sum + c.tasks.length, 0);

  const toggleTask = (cardId, taskId) => {
    const updatedCards = cards.map((c) =>
      c.id === cardId
        ? { ...c, tasks: c.tasks.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t)) }
        : c
    );
    localStorage.setItem("upcomingCards", JSON.stringify(updatedCards));
    window.location.reload(); 
  };

  return (
    <div className="flex min-h-screen justify-start items-start gap-4 text-black">
      <LeftMenu todayCount={todayTasks} upcomingCount={upcomingTasks} />

      <div className="flex-1 mx-4 mt-4 min-h-168 rounded-3xl p-8 text-center flex flex-col gap-6 lg:ml-72 lg:mr-4 lg:h-auto lg:p-10 max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Upcoming</h1>
          <div className="rounded-full px-3 py-1 text-sm font-medium bg-gray-200">
            {totalTasks}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`rounded-2xl border p-4 shadow-sm bg-white border-gray-300 ${
                card.id === "today" ? "md:col-span-2" : ""
              }`}
            >
              <h2 className="font-bold text-lg mb-2">{card.title}</h2>

              <Form method="post" className="flex flex-col gap-2 mb-4">
                <input type="hidden" name="intent" value="addTask" />
                <input type="hidden" name="cardId" value={card.id} />
                <input
                  type="text"
                  name="text"
                  placeholder="Add new task"
                  className="border rounded px-2 py-1 w-full focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-300"
                />

                <select name="category" className="w-full p-2 border rounded" defaultValue={lists.length > 0 ? JSON.stringify(lists[0]) : ""}>
                  {lists.map((list) => (
                    <option key={list.name} value={JSON.stringify(list)}>
                      {list.name}
                    </option>
                  ))}
                </select>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-sm">Start Date & Time</label>
                    <input type="date" name="startDate" className="w-full p-2 border rounded mb-1" />
                    <input type="time" name="startTime" className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="text-sm">End Date & Time</label>
                    <input type="date" name="endDate" className="w-full p-2 border rounded mb-1" />
                    <input type="time" name="endTime" className="w-full p-2 border rounded" />
                  </div>
                </div>
                <button type="submit" className="px-3 py-1 rounded bg-blue-500 text-white mt-2">Add</button>
              </Form>

              <div className="flex flex-col gap-2">
                {card.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between gap-2 border-b pb-1 border-gray-300 pl-2"
                    style={{ borderLeft: task.category ? `4px solid ${task.category.color}` : "none" }}
                  >
                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-1 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={task.done}
                          onChange={() => toggleTask(card.id, task.id)}
                          className="w-4 h-4"
                        />
                        <span className={task.done ? "line-through text-gray-400" : ""}>{task.text}</span>
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      {task.start && task.end && (
                        <p className="text-xs text-gray-500">
                          {new Date(task.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -{" "}
                          {new Date(task.end).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      )}
                      <Form method="post">
                        <input type="hidden" name="intent" value="deleteTask" />
                        <input type="hidden" name="cardId" value={card.id} />
                        <input type="hidden" name="taskId" value={task.id} />
                        <button type="submit" className="text-red-500 text-sm hover:underline">Delete</button>
                      </Form>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Upcoming;
