import React, { useState } from "react";
import VisualIllustration from "../components/VisualIllustration.jsx";
import RightVisualIllustration from "../components/RightVisualllustration.jsx";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-6 p-4 bg-[var(--gray-bg)]">
      
      <VisualIllustration imgSrc="/images/Rectangle1.png" altText="App Preview" />
      
      <RightVisualIllustration>
        <div className="flex flex-col justify-center items-start h-full w-full max-w-sm mx-auto">
          <h2
            style={{ fontFamily: "var(--font-heading)" }}
            className="text-4xl font-bold text-left mb-3 text-[var(--text-color)]"
          >
            Sign in
          </h2>

          <div className="flex flex-col items-start mt-6 w-full max-w-sm mx-auto">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 mb-3 border rounded 
                         focus:outline-none focus:ring-2 
                         border-[var(--border-color)] focus:ring-[var(--kewi-green)]
                         bg-[var(--white)] text-[var(--text-color)]"
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
          </div>

          <div className="mt-6 flex flex-col gap-3 w-full max-w-sm mx-auto">
            <button
              onClick={() => navigate("/Home")}
              className="px-4 py-2 rounded w-full 
                         bg-[var(--kewi-green)] 
                         text-[var(--white)] 
                         shadow-md"
            >
              Sign in
            </button>

            <div className="flex items-center justify-center gap-2 my-2">
              <hr className="flex-1 border-[var(--border-color)]" />
              <span className="text-[var(--color-muted-text)] text-sm">Or</span>
              <hr className="flex-1 border-[var(--border-color)]" />
            </div>

            <div className="flex items-center justify-center gap-4 my-2">
              <button
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm 
                           bg-[var(--gray-bg)] text-[var(--text-color)]"
              >
                <FcGoogle className="w-4 h-4" />
                Google
              </button>

              <button
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm 
                           bg-[var(--gray-bg)] "
              >
                <FaFacebookF className="w-4 h-4 text-[var(--blue)]" />
                Facebook
              </button>
            </div>

            <button
              onClick={() => navigate("/Register")}
              className="px-4 py-2 rounded w-full "
            >
              Don't have an account? Sign up
            </button>
          </div>
        </div>
      </RightVisualIllustration>
    </div>    
  );
}

export default Login;
