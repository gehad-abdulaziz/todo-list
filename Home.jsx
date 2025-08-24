import React, { useEffect, useState } from "react";
import VisualIllustration from "../components/VisualIllustration.jsx";
import LeftMenu from "../components/LeftMenu.jsx";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [showMsg, setShowMsg] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUserName(currentUser.firstName); 
    }

    const timer = setTimeout(() => setShowMsg(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen justify-center items-start gap-4">
      <LeftMenu />

      {showMsg && (
        <div
          className="fixed top-4 left-1/2 transform -translate-x-1/2 
                     bg-(--kewi-green) text-(--white) px-6 py-3 
                     rounded-xl shadow-lg animate-slide-down z-50"
        >
          💗 Welcome back, {userName || "User"}!
        </div>
      )}

      <div
        className="flex-1 mx-4 mt-4 min-h-168 rounded-3xl 
                   bg-(--gray-bg) p-8 text-center flex flex-col 
                   justify-center gap-4 lg:ml-72 lg:mr-4 lg:h-40 lg:p-20 max-w-6xl"
      >
        <h2
          style={{ fontFamily: "var(--font-heading)" }}
          className="text-xl md:text-2xl font-bold text-(--text-color)"
        >
          Welcome to ToDoPy
        </h2>

        <p
          style={{ fontFamily: "var(--font-main)" }}
          className="mx-auto max-w-4xl px-4 py-6 sm:px-8 break-words text-(--color-muted-text)"
        >
          A to-do app is a simple, user-friendly digital tool designed to help
          individuals and teams organize tasks and manage their daily
          activities efficiently. Users can create, edit, and prioritize tasks,
          set deadlines or reminders, categorize items, and track their
          progress, all within an intuitive and accessible interface. These apps
          are essential for improving productivity, reducing stress, and
          ensuring that important responsibilities are not forgotten.
        </p>

        <button
          onClick={() => navigate("/Upcoming")}
          className="mx-auto w-full max-w-xs rounded-2xl 
                     bg-(--kewi-green) 
                     text-(--white) 
                     px-6 py-2 shadow-md"
        >
          Go To Tasks
        </button>
      </div>
    </div>
  );
}

export default Home;
