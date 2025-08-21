import React from "react";
import VisualIllustration from "../components/VisualIllustration.jsx";

import RightVisualIllustration from "../components/RightVisualllustration.jsx";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-6 p-4 bg-[var(--gray-bg)]">
      
      <VisualIllustration imgSrc="/images/Rectangle1.png" altText="App Preview" />
      
      <RightVisualIllustration>
        <div className="flex flex-col justify-center items-center h-full w-full px-16 py-8">
          
          <h2
            style={{ fontFamily: "var(--font-heading)" }}
            className="text-4xl font-bold text-center text-[var(--text-color)]"
          >
            ToDo Py
          </h2>
          
          <div className="flex flex-col items-start mt-6 w-full max-w-md">
            <p
              style={{ fontFamily: "var(--font-main)" }}
              className="text-sm leading-relaxed text-[var(--color-muted-text)]"
            >
              Stay Organized, Get Things Done: Your Ultimate To-Do List App. 
              A todo list app is a digital task management tool designed to help users
              organize and prioritize their daily activities and responsibilities.
            </p>

            <div className="mt-6 flex flex-col gap-3 w-full">
              <button
                onClick={() => navigate("/Register")}
                className="px-4 py-2 rounded w-full 
                           bg-[var(--kewi-green)] 
                           text-[var(--white)] 
                           shadow-md"
              >
                Get Started
              </button>

              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 rounded w-full 
                           "
              >
                Already have an account? Sign in
              </button>
            </div>
          </div>
        </div>
      </RightVisualIllustration>
    </div>
  );
}

export default Landing;
