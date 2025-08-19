import React from "react";
import { useLoaderData, Form, redirect } from "react-router-dom";
import LeftMenu from "../components/LeftMenu.jsx";

export async function loader() {
  const initialCards = [
    { id: "today", title: "Today", tasks: [] },
    { id: "tomorrow", title: "Tomorrow", tasks: [] },
    { id: "week", title: "This Week", tasks: [] },
  ];
  const saved = localStorage.getItem("upcomingCards");
  const cards = saved ? JSON.parse(saved) : initialCards;
  return { cards };
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const intent = data.intent;

  const saved = localStorage.getItem("upcomingCards");
  let cards = JSON.parse(saved || "[]");

  if (intent === "addTask") {
    const { cardId, text } = data;
    if (text.trim() === "") return null;
    cards = cards.map((c) =>
      c.id === cardId
        ? { ...c, tasks: [...c.tasks, { id: Date.now(), text, done: false }] }
        : c
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
      c.id === cardId
        ? { ...c, tasks: c.tasks.filter((t) => t.id.toString() !== taskId) }
        : c
    );
  }

  localStorage.setItem("upcomingCards", JSON.stringify(cards));
  return redirect("/upcoming");
}

function Upcoming() {
  const { cards } = useLoaderData();

  const todayTasks = cards.find((c) => c.id === "today")?.tasks.length || 0;
  const upcomingTasks = cards
    .filter((c) => c.id !== "today")
    .reduce((sum, c) => sum + c.tasks.length, 0);
  const totalTasks = cards.reduce((sum, c) => sum + c.tasks.length, 0);

  return (
    <div className="flex min-h-screen justify-start items-start gap-4 bg-[var(--color-bg)] text-[var(--color-text)]">
      <LeftMenu todayCount={todayTasks} upcomingCount={upcomingTasks} />

      <div className="flex-1 mx-4 mt-4 min-h-168 rounded-3xl p-8 text-center flex flex-col gap-6 lg:ml-72 lg:mr-4 lg:h-auto lg:p-10 max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Upcoming</h1>
          <div className="rounded-full px-3 py-1 text-sm font-medium bg-[var(--color-badge-bg)]">
            {totalTasks}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`rounded-2xl border p-4 shadow-sm bg-[var(--color-card-bg)] border-[var(--color-border)] ${
                card.id === "today" ? "md:col-span-2" : ""
              }`}
            >
              <h2 className="font-bold text-lg mb-2">{card.title}</h2>

              <Form method="post" className="flex gap-2 mb-2">
                <input type="hidden" name="intent" value="addTask" />
                <input type="hidden" name="cardId" value={card.id} />
                <input
                  type="text"
                  name="text"
                  placeholder="Add new task"
                  className="border rounded px-2 py-1 w-full focus:outline-none focus:ring-2 border-[var(--color-border)] focus:ring-[var(--color-primary-light)]"
                />
                <button
                  type="submit"
                  className="px-3 py-1 rounded bg-[var(--color-primary)] text-white"
                >
                  Add
                </button>
              </Form>

              <div className="flex flex-col gap-2">
                {card.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between gap-2 border-b pb-1 border-[var(--color-border)]"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={task.done}
                        onChange={() => {
                          const savedCards = JSON.parse(
                            localStorage.getItem("upcomingCards") || "[]"
                          );
                          const updated = savedCards.map((c) =>
                            c.id === card.id
                              ? {
                                  ...c,
                                  tasks: c.tasks.map((t) =>
                                    t.id === task.id
                                      ? { ...t, done: !t.done }
                                      : t
                                  ),
                                }
                              : c
                          );
                          localStorage.setItem(
                            "upcomingCards",
                            JSON.stringify(updated)
                          );
                          window.location.reload();
                        }}
                      />
                      <span
                        className={
                          task.done ? "line-through text-[var(--color-muted-text)]" : ""
                        }
                      >
                        {task.text}
                      </span>
                    </div>

                    <Form method="post">
                      <input type="hidden" name="intent" value="deleteTask" />
                      <input type="hidden" name="cardId" value={card.id} />
                      <input type="hidden" name="taskId" value={task.id} />
                      <button
                        type="submit"
                        className="text-[var(--color-danger)] text-sm hover:underline"
                      >
                        Delete
                      </button>
                    </Form>
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
