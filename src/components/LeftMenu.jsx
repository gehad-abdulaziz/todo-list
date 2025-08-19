import React, { useState, useEffect } from "react";
import {
  HiSearch,
  HiOutlineCalendar,
  HiOutlineClipboardList,
  HiChevronRight,
  HiCog,
  HiLogout,
  HiMenu,
  HiX,
  HiOutlineClipboard
} from "react-icons/hi";

const initialLists = [
  { name: "Work", color: "var(--list-work)" },
  { name: "Personal", color: "var(--list-personal)" },
  { name: "Study", color: "var(--list-study)" },
  { name: "Fitness", color: "var(--accent-blue)" },
];

const initialTasks = [
  { name: "Finish report", dueDate: new Date() },
  { name: "Read book", dueDate: new Date() },
  { name: "Go to gym", dueDate: new Date(new Date().setDate(new Date().getDate() + 2)) },
  { name: "Project deadline", dueDate: new Date(new Date().setDate(new Date().getDate() + 5)) },
  { name: "Buy groceries", dueDate: new Date(new Date().setDate(new Date().getDate() + 1)) },
];

// ---------------- Calendar ----------------
const SimpleCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const blanks = Array(firstDayOfMonth).fill(null);
  const daysArr = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const isToday = (day) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  return (
    <div className="bg-[var(--card-bg)] p-4 rounded-lg shadow-lg w-full max-w-xs">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
          className="p-2 rounded-full hover:bg-[var(--hover-bg)]"
        >
          &lt;
        </button>
        <span className="font-bold text-lg text-[var(--text-color)]">
          {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
        </span>
        <button
          onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
          className="p-2 rounded-full hover:bg-[var(--hover-bg)]"
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {daysOfWeek.map((day) => (
          <div key={day} className="font-semibold text-[var(--text-muted)]">{day}</div>
        ))}
        {blanks.map((_, i) => <div key={`blank-${i}`}></div>)}
        {daysArr.map((day) => (
          <div
            key={day}
            className={`p-2 rounded-full cursor-pointer hover:bg-[var(--hover-bg)] ${
              isToday(day)
                ? "bg-[var(--accent-blue)] text-white hover:bg-[var(--accent-blue-dark)]"
                : "text-[var(--text-color)]"
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

const LeftMenu = ({ todayCount, upcomingCount }) => {
  const [open, setOpen] = useState(false);
  const [lists, setLists] = useState(() => {
    const saved = localStorage.getItem("lists");
    return saved ? JSON.parse(saved) : initialLists;
  });
  const [tasks, setTasks] = useState(initialTasks);
  const [stickyNotes, setStickyNotes] = useState(["Remember to call mom!"]);
  const [showAllLists, setShowAllLists] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isStickyWallOpen, setIsStickyWallOpen] = useState(false);
  const [isAddListModalOpen, setIsAddListModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists));
  }, [lists]);

  const handleAddNewList = (event) => {
    event.preventDefault();
    const name = event.target.elements.listName.value;
    const color = event.target.elements.listColor.value;
    if (name && color) {
      setLists([...lists, { name, color }]);
      setIsAddListModalOpen(false);
    }
  };

  const handleAddStickyNote = (event) => {
    event.preventDefault();
    const noteText = event.target.elements.noteText.value;
    if (noteText) {
      setStickyNotes([...stickyNotes, noteText]);
      event.target.reset();
    }
  };

  const listsToDisplay = showAllLists ? lists : lists.slice(0, 2);

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[var(--hover-bg)] rounded-lg"
        onClick={() => setOpen(true)}
      >
        <HiMenu className="w-6 h-6 text-[var(--icon-color)]" />
      </button>

      <div
        className={`fixed top-0 left-0 w-72 max-h-screen bg-[var(--gray-bg)] rounded-xl py-3 px-3 my-2 mx-4 mt-4
        transform transition-transform duration-300 z-40
        ${open ? "translate-x-0" : "-translate-x-100"} md:translate-x-0 
        overflow-y-auto shadow-lg`}
      >
        <button
          className="md:hidden absolute top-4 right-4 p-2 bg-[var(--hover-bg)] rounded-lg"
          onClick={() => setOpen(false)}
        >
          <HiX className="w-6 h-6 text-[var(--icon-color)]" />
        </button>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-[var(--text-color)]">Menu</h1>
        </div>

        <div className="flex items-center bg-[var(--search-bg)] rounded-full px-4 py-2">
          <HiSearch className="w-5 h-5 text-[var(--icon-color)]" />
          <input
            type="text"
            placeholder="Search..."
            className="ml-2 bg-transparent outline-none flex-1 text-[var(--text-color)] placeholder-[var(--text-muted)]"
          />
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-bold mb-3 text-[var(--text-color)]">Tasks</h2>
          <ul className="space-y-4">
            <li className="flex justify-between items-center cursor-pointer">
              <div className="flex items-center gap-3">
                <HiChevronRight className="w-5 h-5 text-[var(--icon-color)]" />
                <span>Upcoming</span>
              </div>
              <span className="bg-[var(--chip-bg)] text-[var(--chip-text)] px-3 py-1 rounded-full text-sm">
                {upcomingCount > 15 ? "15+" : upcomingCount}
              </span>
            </li>
            <li className="flex justify-between items-center cursor-pointer">
              <div className="flex items-center gap-3">
                <HiOutlineClipboardList className="w-5 h-5 text-[var(--icon-color)]" />
                <span>Today</span>
              </div>
              <span className="bg-[var(--chip-bg)] text-[var(--chip-text)] px-3 py-1 rounded-full text-sm">
                {todayCount}
              </span>
            </li>
            <li
              onClick={() => setIsCalendarOpen(true)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <HiOutlineCalendar className="w-5 h-5 text-[var(--icon-color)]" />
              <span>Calendar</span>
            </li>
            <li
              onClick={() => setIsStickyWallOpen(true)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <HiOutlineClipboard className="w-5 h-5 text-[var(--icon-color)]" />
              <span>Sticky Wall</span>
            </li>
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-bold mb-3 text-[var(--text-color)]">Lists</h2>
          <ul className="space-y-3">
            {listsToDisplay.map((list, index) => (
              <li
                key={list.name}
                className="flex items-center justify-between gap-3 bg-[var(--list-bg)] rounded-full px-3 py-2"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: list.color }}
                  ></span>
                  <span>{list.name}</span>
                </div>
                <button
                  onClick={() => setLists(lists.filter((_, i) => i !== index))}
                  className="text-[var(--color-danger)] hover:text-[var(--red-600)] text-sm font-bold"
                >
                  ✕
                </button>
              </li>
            ))}
            {!showAllLists && lists.length > 2 && (
              <li
                onClick={() => setShowAllLists(true)}
                className="flex justify-center items-center gap-3 cursor-pointer text-[var(--accent-blue)] font-semibold py-2"
              >
                <span>See all lists</span>
              </li>
            )}
            <li
              onClick={() => setIsAddListModalOpen(true)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <span className="w-5 h-5 border-2 border-[var(--border-color)] rounded-full flex items-center justify-center text-[var(--icon-color)]">
                +
              </span>
              <span>Add new list</span>
            </li>
          </ul>
        </div>

        <div className="mt-10 mb-4 space-y-4 text-[var(--text-color)]">
          <div className="flex items-center gap-3 cursor-pointer">
            <HiCog className="w-5 h-5 text-[var(--icon-color)]" />
            <span>Settings</span>
          </div>
          <div className="flex items-center gap-3 cursor-pointer">
            <HiLogout className="w-5 h-5 text-[var(--icon-color)]" />
            <span>Sign Out</span>
          </div>
        </div>
      </div>

      {isCalendarOpen && (
        <div
          className="fixed inset-0 bg-black/10 z-50 flex justify-center items-center"
          onClick={() => setIsCalendarOpen(false)}
        >
          <div className="bg-[var(--color-card-bg)] p-4 rounded-xl shadow-lg"onClick={(e) => e.stopPropagation()}>
            <SimpleCalendar />
          </div>
        </div>
      )}

      {isStickyWallOpen && (
        <div
          className="fixed inset-0 bg-black/10 z-50 flex justify-center items-center"
          onClick={() => setIsStickyWallOpen(false)}
        >
          <div
            className="bg-[var(--sticky-bg)] p-6 rounded-lg w-full max-w-md shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4 text-[var(--text-color)]">Sticky Wall</h2>
            <div className="space-y-2 h-64 overflow-y-auto mb-4">
              {stickyNotes.map((note, index) => (
                <div key={index} className="bg-[var(--sticky-note)] p-3 rounded">
                  {note}
                </div>
              ))}
            </div>
            <form onSubmit={handleAddStickyNote}>
              <input
                name="noteText"
                type="text"
                placeholder="Add a new note..."
                className="w-full p-2 rounded border border-[var(--border-color)]"
              />
              <button
                type="submit"
                className="w-full mt-2 bg-[var(--accent-yellow)] text-[var(--accent-yellow-text)] font-bold py-2 rounded hover:bg-[var(--accent-yellow-dark)] transition-colors"
              >
                Add Note
              </button>
            </form>
          </div>
        </div>
      )}

      {isAddListModalOpen && (
        <div
          className="fixed inset-0 bg-black/10 z-50 flex justify-center items-center"
          onClick={() => setIsAddListModalOpen(false)}
        >
          <div className="bg-white p-6 rounded-lg w-full max-w-sm shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4 text-[var(--text-color)]">Add New List</h2>
            <form onSubmit={handleAddNewList}>
              <div className="mb-4">
                <label htmlFor="listName" className="block text-[var(--text-muted)] mb-1">List Name</label>
                <input id="listName" name="listName" type="text" className="w-full p-2 border border-[var(--border-color)] rounded" required />
              </div>
              <div className="mb-6">
                <label htmlFor="listColor" className="block text-[var(--text-muted)] mb-1">List Color</label>
                <select id="listColor" name="listColor" className="w-full p-2 border border-[var(--border-color)] rounded">
                  <option value="var(--list-work)">Red</option>
                  <option value="var(--list-personal)">Blue</option>
                  <option value="var(--list-study)">Green</option>
                  <option value="var(--kewi-green)">Kewi Green</option>
                  <option value="var(--accent-blue)">Blue Accent</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-[var(--accent-blue)] font-bold py-2 rounded hover:bg-[var(--accent-blue-dark)] transition-colors">Add List</button>
            </form>
          </div>
        </div>
      )}

      {open && <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={() => setOpen(false)}></div>}
    </>
  );
};

export default LeftMenu;
