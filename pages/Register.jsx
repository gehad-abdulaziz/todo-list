import React, { useState } from "react";
import VisualIllustration from "../components/VisualIllustration.jsx";
import RightVisualIllustration from "../components/RightVisualllustration.jsx";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    rePassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = () => {
    setError("");
    setSuccess("");

    const { firstName, lastName, email, password, rePassword } = formData;

    if (!firstName || !lastName || !email || !password || !rePassword) {
      setError("Please fill in all fields!");
      return;
    }

    if (password !== rePassword) {
      setError("Passwords do not match!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((u) => u.email === email)) {
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

          {error && <p className="error-msg">{error}</p>}
          {success && <p className="success-msg">{success}</p>}

          <div className="flex flex-col items-start mt-6 w-full max-w-sm mx-auto">
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              type="text"
              placeholder="First Name"
              className="input-field"
            />
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              type="text"
              placeholder="Last Name"
              className="input-field"
            />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Email"
              className="input-field"
            />

            <div className="relative w-full mb-3">
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="password-input"
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
                name="rePassword"
                value={formData.rePassword}
                onChange={handleChange}
                type={showRePassword ? "text" : "password"}
                placeholder="Re-Password"
                className="password-input"
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
            <button onClick={handleSignUp} className="primary-btn">
              Sign Up
            </button>
            <button onClick={() => navigate("/login")} className="secondary-btn">
              Already have an account? Sign in
            </button>
          </div>
        </div>
      </RightVisualIllustration>
    </div>
  );
}

export default Register;
