import React, { useState } from "react";
import VisualIllustration from "../components/VisualIllustration.jsx";
import RightVisualIllustration from "../components/RightVisualllustration.jsx";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-6 p-4 bg-[var(--gray-bg)]">
      
      <VisualIllustration imgSrc="/images/Rectangle1.png" altText="App Preview" />
      
      <RightVisualIllustration>
        <div className="flex flex-col justify-center items-start h-full w-full max-w-sm mx-auto">
          <h2
            style={{ fontFamily: '"Oswald", sans-serif' }}
            className="text-4xl font-bold text-left mb-4"
          >
            Sign Up
          </h2>

          <div className="flex flex-col items-start mt-6 w-full max-w-sm mx-auto">
            <input
              type="text"
              placeholder="First Name"
              className="w-full px-4 py-2 mb-3 border rounded 
                         focus:outline-none focus:ring-2 
                         border-[var(--border-color)] focus:ring-[var(--kewi-green)]"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full px-4 py-2 mb-3 border rounded 
                         focus:outline-none focus:ring-2 
                         border-[var(--border-color)] focus:ring-[var(--kewi-green)]"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 mb-3 border rounded 
                         focus:outline-none focus:ring-2 
                         border-[var(--border-color)] focus:ring-[var(--kewi-green)]"
            />

            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-2 mb-3 border rounded 
                           focus:outline-none focus:ring-2 
                           border-[var(--border-color)] focus:ring-[var(--kewi-green)]
                           bg-[var(--white)] text-[var(--text-color)]"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[var(--icon-color)]"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </span>
            </div>

            <div className="relative w-full">
              <input
                type={showRePassword ? "text" : "password"}
                placeholder="Re-Password"
                className="w-full px-4 py-2 mb-3 border rounded 
                           focus:outline-none focus:ring-2 
                           border-[var(--border-color)] focus:ring-[var(--kewi-green)]
                           bg-[var(--white)] text-[var(--text-color)]"
              />
              <span
                onClick={() => setShowRePassword(!showRePassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[var(--icon-color)]"
              >
                {showRePassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 w-full">
            <button
              onClick={() => navigate("/Home")}
              className="px-4 py-2 rounded w-full 
                         bg-[var(--kewi-green)] 
                         text-[var(--white)] shadow-md"
            >
              Sign Up
            </button>

            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded w-full"
            >
              Already have an account? Sign in
            </button>
          </div>
        </div>
      </RightVisualIllustration>
    </div>
  );
}

export default Register;
