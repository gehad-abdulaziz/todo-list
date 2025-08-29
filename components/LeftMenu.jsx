import React, { useState, useEffect } from "react";
import {
  HiSearch,
  HiOutlineCalendar,
  HiOutlineClipboardList,
  HiChevronRight,
  HiLogout,
  HiMenu,
  HiX,
  HiOutlineClipboard
} from "react-icons/hi";
import { AiOutlineAlignCenter } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

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

const colorOptions = [
  { label: "Red", value: "--list-work" },
  { label: "Blue", value: "--list-personal" },
  { label: "Green", value: "--list-study" },
  { label: "Kewi Green", value: "--kewi-green" },
  { label: "Blue Accent", value: "--accent-blue" },
];

const LeftMenu = ({ todayCount, upcomingCount }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [lists, setLists] = useState(() => {
    const saved = localStorage.getItem("lists");
    return saved ? JSON.parse(saved) : initialLists;
  });
  const [tasks, setTasks] = useState(initialTasks);
  const [stickyNotes, setStickyNotes] = useState(["Remember to call mom!"]);
  const [showAllLists, setShowAllLists] = useState(false);
  const [isStickyWallOpen, setIsStickyWallOpen] = useState(false);
  const [isAddListModalOpen, setIsAddListModalOpen] = useState(false);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);

  const [selectedColor, setSelectedColor] = useState(colorOptions[0].value);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists));
  }, [lists]);

  const handleAddNewList = (event) => {
    event.preventDefault();
    const name = event.target.elements.listName.value;
    if (name && selectedColor) {
      setLists([...lists, { name, color: `var(${selectedColor})` }]);
      setIsAddListModalOpen(false);
      setSelectedColor(colorOptions[0].value);
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

  const handleSignOut = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const listsToDisplay = showAllLists ? lists : lists.slice(0, 2);

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-(--hover-bg) rounded-lg"
        onClick={() => setOpen(true)}
      >
        <HiMenu className="w-6 h-6 text-(--icon-color)" />
      </button>

      <div
        className={`fixed top-0 left-0 w-72 max-h-screen bg-(--gray-bg) rounded-xl py-3 px-5 my-1 mx-4 mt-3
        transform transition-transform duration-300 z-40
        ${open ? "translate-x-0" : "-translate-x-100"} md:translate-x-0 
        overflow-y-auto shadow-lg`}
      >
        <button
          className="md:hidden absolute top-4 right-4 p-2 bg-(--hover-bg) rounded-lg"
          onClick={() => setOpen(false)}
        >
          <HiX className="w-6 h-6 text-(--icon-color)" />
        </button>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-(--text-color)">Menu</h1>
        </div>

        <div className="flex items-center bg-(--search-bg) rounded-full px-4 py-2">
          <HiSearch className="w-5 h-5 text-(--icon-color)" />
          <input
            type="text"
            placeholder="Search..."
            className="ml-2 bg-transparent outline-none flex-1 text-(--text-color) placeholder-(--text-muted)"
          />
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-bold mb-3 text-(--text-color)">Tasks</h2>
          <ul className="space-y-4">
            <li onClick={() => navigate("/upcoming")} className="flex justify-between items-center cursor-pointer">
              <div className="flex items-center gap-3">
                <HiChevronRight className="w-5 h-5 text-(--icon-color)" />
                <span>Upcoming</span>
              </div>
              <span className="bg-(--chip-bg) text-(--chip-text) px-3 py-1 rounded-full text-sm">
                {upcomingCount > 15 ? "15+" : upcomingCount}
              </span>
            </li>
            <li onClick={() => navigate("/today")} className="flex justify-between items-center cursor-pointer">
              <div className="flex items-center gap-3">
                <HiOutlineClipboardList className="w-5 h-5 text-(--icon-color)" />
                <span>Today</span>
              </div>
              <span className="bg-(--chip-bg) text-(--chip-text) px-3 py-1 rounded-full text-sm">
                {todayCount}
              </span>
            </li>
            <li onClick={() => navigate("/calendar")} className="flex items-center gap-3 cursor-pointer">
              <HiOutlineCalendar className="w-5 h-5 text-(--icon-color)" />
              <span>Calendar</span>
            </li>
            <li onClick={() => setIsStickyWallOpen(true)} className="flex items-center gap-3 cursor-pointer">
              <HiOutlineClipboard className="w-5 h-5 text-(--icon-color)" />
              <span>Sticky Wall</span>
            </li>
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-bold mb-3 text-(--text-color)">Lists</h2>
          <ul className="space-y-3">
            {listsToDisplay.map((list, index) => (
              <li key={list.name} className="flex items-center justify-between gap-3 rounded-full px-3 py-2 hover:bg-(--hover-bg)">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: list.color }}></span>
                  <span style={{ color: list.color }}>{list.name}</span>
                </div>
                <button
                  onClick={() => setLists(lists.filter((_, i) => i !== index))}
                  className="text-(--color-danger) hover:text-(--red-600) text-sm font-bold"
                >
                  ✕
                </button>
              </li>
            ))}
            {!showAllLists && lists.length > 2 && (
              <li
                onClick={() => setShowAllLists(true)}
                className="flex justify-center items-center gap-3 cursor-pointer text-(--accent-blue) font-semibold py-2"
              >
                <span>See all lists</span>
              </li>
            )}
            <li
              onClick={() => setIsAddListModalOpen(true)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <span className="w-5 h-5 border-2 border-(--border-color) rounded-full flex items-center justify-center text-(--icon-color)">
                +
              </span>
              <span>Add new list</span>
            </li>
          </ul>
        </div>

        <div className="mt-10 mb-4 space-y-4 text-(--text-color)">
          <div className="flex items-center gap-3 cursor-pointer">
            <AiOutlineAlignCenter className="w-5 h-5 text-(--icon-color)" />
            <span>Settings</span>
          </div>
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setIsSignOutModalOpen(true)}>
            <HiLogout className="w-5 h-5 text-(--icon-color)" />
            <span>Sign Out</span>
          </div>
        </div>
      </div>

{isStickyWallOpen && (
  <div
    className="fixed inset-0 bg-black/10 z-50 flex justify-center items-center"
    onClick={() => setIsStickyWallOpen(false)}
  >
    <div
      className="bg-(--sticky-bg) p-3 rounded-lg w-[280px] max-w-[280px] shadow-xl"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-lg font-bold mb-3 text-(--text-color) text-center">Sticky Wall</h2>

      {/* Sticky Notes List */}
      <div className="space-y-2 h-48 overflow-y-auto mb-3">
        {stickyNotes.map((note, index) => (
          <div
            key={index}
            className="bg-(--sticky-note) p-1.5 rounded break-words flex justify-between items-start min-h-[30px] text-sm"
          >
            <span className="break-words">{note}</span>
            <button
              onClick={() => {
                const updatedNotes = stickyNotes.filter((_, i) => i !== index);
                setStickyNotes(updatedNotes);
                localStorage.setItem("stickyNotes", JSON.stringify(updatedNotes));
              }}
              className="text-red-500 text-xs font-bold ml-2 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Add New Note Form */}
      <form onSubmit={handleAddStickyNote}>
        <input
          name="noteText"
          type="text"
          placeholder="Add a new note..."
          className="w-full p-1.5 rounded border border-(--border-color) text-sm break-words"
        />
        <button
          type="submit"
          className="w-full mt-2 bg-(--accent-yellow) text-(--accent-yellow-text) font-bold py-1.5 rounded hover:bg-(--accent-yellow-dark) transition-colors text-sm"
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
          <div
            className="bg-(--color-background) p-6 rounded-lg w-full max-w-sm shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4 text-(--text-color)">Add New List</h2>
            <form onSubmit={handleAddNewList}>
              <div className="mb-4">
                <label htmlFor="listName" className="block text-(--text-muted) mb-1">List Name</label>
                <input id="listName" name="listName" type="text" className="w-full p-2 border border-(--border-color) rounded" required />
              </div>
              <div className="mb-6 relative">
                <label className="block text-(--text-muted) mb-1">List Color</label>
                <div
                  className="w-full p-2 border border-(--border-color) rounded cursor-pointer"
                  style={{ color: `var(${selectedColor})` }}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {colorOptions.find(c => c.value === selectedColor)?.label}
                </div>
                {isDropdownOpen && (
                  <div className="absolute w-full mt-1 bg-(--color-background) border border-(--border-color) rounded shadow-lg z-10">
                    {colorOptions.map((color) => (
                      <div
                        key={color.value}
                        className="p-2 cursor-pointer hover:bg-(--hover-bg)"
                        style={{ color: `var(${color.value})` }}
                        onClick={() => {
                          setSelectedColor(color.value);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {color.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button type="submit" className="w-full bg-(--accent-blue) font-bold py-2 rounded hover:bg-(--accent-blue-dark) transition-colors">Add List</button>
            </form>
          </div>
        </div>
      )}

      {isSignOutModalOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center"
          onClick={() => setIsSignOutModalOpen(false)}
        >
          <div
            className="bg-(--color-background) p-6 rounded-lg w-full max-w-sm shadow-xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4 text-(--text-color)">Are you sure?</h2>
            <p className="mb-6 text-(--text-muted)">Do you really want to sign out?</p>
            <div className="flex justify-around">
              <button
                onClick={() => setIsSignOutModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {open && <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={() => setOpen(false)}></div>}
    </>
  );
};

export default LeftMenu;
