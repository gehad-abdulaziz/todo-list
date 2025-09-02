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
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = () => {
    setError("");

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/Home");
    } else {
      setError("Invalid email or password!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-6 p-4 bg-(--gray-bg)">
      <VisualIllustration imgSrc="/images/Rectangle1.png" altText="App Preview" />

      <RightVisualIllustration>
        <div className="flex flex-col justify-center items-start h-full w-full max-w-sm mx-auto">
          <h2
            className="text-4xl font-bold text-left mb-3 text-(--text-color)"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Sign in
          </h2>

          {error && <p className="error-msg">{error}</p>}

          <div className="flex flex-col items-start mt-6 w-full max-w-sm mx-auto">
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Email"
              className="input-field"
            />

            <div className="relative w-full">
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
          </div>

          <div className="mt-6 flex flex-col gap-3 w-full max-w-sm mx-auto">
            <button onClick={handleLogin} className="primary-btn">
              Sign in
            </button>

            <div className="flex items-center justify-center gap-2 my-2">
              <hr className="flex-1 border-(--border-color)" />
              <span className="text-(--color-muted-text) text-sm">Or</span>
              <hr className="flex-1 border-(--border-color)" />
            </div>

            <div className="flex items-center justify-center gap-4 my-2">
              <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm bg-(--gray-bg) text-(--text-color)">
                <FcGoogle className="w-4 h-4" /> Google
              </button>
              <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm bg-(--gray-bg)">
                <FaFacebookF className="w-4 h-4 text-(--blue)" /> Facebook
              </button>
            </div>

            <button
              onClick={() => navigate("/Register")}
              className="secondary-btn"
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
