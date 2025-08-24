import React, { useState } from "react";
import VisualIllustration from "../components/VisualIllustration.jsx";
import RightVisualIllustration from "../components/RightVisualllustration.jsx";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignUp = () => {
    setError("");
    setSuccess("");

    if (!firstName || !lastName || !email || !password || !rePassword) {
      setError("Please fill in all fields!");
      return;
    }

    if (password !== rePassword) {
      setError("Passwords do not match!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some(u => u.email === email)) {
      setError("Email already registered!");
      return;
    }

    users.push({ firstName, lastName, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    setSuccess("Registered successfully!");
    setTimeout(() => navigate("/login"), 1500); 
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-6 p-4 bg-(--gray-bg)">
      <VisualIllustration imgSrc="/images/Rectangle1.png" altText="App Preview" />

      <RightVisualIllustration>
        <div className="flex flex-col justify-center items-start h-full w-full max-w-sm mx-auto">
          <h2
            className="text-4xl font-bold text-left mb-4"
            style={{ fontFamily: '"Oswald", sans-serif' }}
          >
            Sign Up
          </h2>

          {error && (
            <p className="w-full mb-2 p-2 text-(--color-error-text) bg-(--color-error-bg) rounded">
              {error}
            </p>
          )}
          {success && (
            <p className="w-full mb-2 p-2 text-(--color-success-text) bg-(--color-success-bg) rounded">
              {success}
            </p>
          )}

          <div className="flex flex-col items-start mt-6 w-full max-w-sm mx-auto">
            <input
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              type="text"
              placeholder="First Name"
              className="w-full px-4 py-2 mb-3 border rounded focus:outline-none focus:ring-2 border-(--border-color) focus:ring-(--kewi-green)"
            />
            <input
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              type="text"
              placeholder="Last Name"
              className="w-full px-4 py-2 mb-3 border rounded focus:outline-none focus:ring-2 border-(--border-color) focus:ring-(--kewi-green)"
            />
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 mb-3 border rounded focus:outline-none focus:ring-2 border-(--border-color) focus:ring-(--kewi-green)"
            />

            <div className="relative w-full mb-3">
              <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 border-(--border-color) focus:ring-(--kewi-green)"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-(--icon-color)"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </span>
            </div>

            <div className="relative w-full mb-6">
              <input
                value={rePassword}
                onChange={e => setRePassword(e.target.value)}
                type={showRePassword ? "text" : "password"}
                placeholder="Re-Password"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 border-(--border-color) focus:ring-(--kewi-green)"
              />
              <span
                onClick={() => setShowRePassword(!showRePassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-(--icon-color)"
              >
                {showRePassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 w-full">
            <button
              onClick={handleSignUp}
              className="px-4 py-2 rounded w-full bg-(--kewi-green) text-(--btn-blue-text) shadow-md"
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
