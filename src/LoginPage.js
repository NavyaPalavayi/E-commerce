import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function LoginPage({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");

  // show/hide toggles
  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // password strength checker
  const checkPasswordStrength = (value) => {
    let strength = "";
    if (value.length === 0) {
      strength = "";
    } else if (value.length < 3) {
      strength = "Weak";
    } else if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/.test(value)) {
      strength = "Medium";
    } else if (
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/.test(
        value
      )
    ) {
      strength = "Strong";
    } else {
      strength = "Weak";
    }
    setPasswordStrength(strength);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password || (isSignup && (!mobile || !confirmPassword))) {
      alert("Please fill all required fields");
      return;
    }

    if (isSignup) {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      localStorage.setItem(
        "user",
        JSON.stringify({ username, password, mobile })
      );
      alert("Account created successfully!");
      setIsSignup(false);
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setMobile("");
      setPasswordStrength("");
    } else {
      const savedUser = JSON.parse(localStorage.getItem("user"));
      if (
        savedUser &&
        savedUser.username === username &&
        savedUser.password === password
      ) {
        onLogin(username);
      } else {
        alert("Invalid username or password");
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-dark">
      <div className="card shadow p-4" style={{ width: "22rem" }}>
        <div className="text-center mb-3">
           <img
            src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
            alt="cart"
            width="80"
            
          />
          <h4 className="text-danger mt-2">
            {isSignup ? "Create Account" : "Ecommerce Login"}
          </h4>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-3 text-start">
            <label className="form-label fw-semibold">Username 👤</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {isSignup && (
            <>
              {/* Mobile Number */}
              <div className="mb-3 text-start">
                <label className="form-label fw-semibold">Mobile Number 📱</label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Enter mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  pattern="[0-9]{10}"
                  maxLength="10"
                  title="Enter a valid 10-digit mobile number"
                  required
                />
              </div>

              {/* Create Password */}
              <div className="mb-3 text-start position-relative">
                <label className="form-label fw-semibold">Create Password 🔒</label>
                <input
                  type={showCreatePassword ? "text" : "password"}
                  className="form-control pe-5"
                  placeholder="Create password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    checkPasswordStrength(e.target.value);
                  }}
                  required
                />
                <button
                  type="button"
                  className="btn position-absolute top-50 end-0 translate-middle-y me-2 border-0 bg-transparent"
                  onClick={() => setShowCreatePassword(!showCreatePassword)}
                >
                  {showCreatePassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Password Strength */}
              {passwordStrength && (
                <div
                  className={`fw-semibold mb-2 text-start ${
                    passwordStrength === "Weak"
                      ? "text-danger"
                      : passwordStrength === "Medium"
                      ? "text-warning"
                      : "text-success"
                  }`}
                >
                  Password Strength: {passwordStrength}
                </div>
              )}

              {/* Confirm Password */}
              <div className="mb-3 text-start position-relative">
                <label className="form-label fw-semibold">Confirm Password 🔒</label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control pe-5"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn position-absolute top-50 end-0 translate-middle-y me-2 border-0 bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </>
          )}

          {!isSignup && (
            <div className="mb-3 text-start position-relative">
              <label className="form-label fw-semibold">Password 🔒</label>
              <input
                type={showLoginPassword ? "text" : "password"}
                className="form-control pe-5"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn position-absolute top-50 end-0 translate-middle-y me-2 border-0 bg-transparent"
                onClick={() => setShowLoginPassword(!showLoginPassword)}
              >
                {showLoginPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          )}

          <button type="submit" className="btn btn-primary w-100">
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="mb-1">
            {isSignup ? "Already have an account?" : "Don't have an account?"}
          </p>
          <button
            type="button"
            className="btn btn-link text-decoration-underline p-0"
            onClick={() => {
              setIsSignup(!isSignup);
              setUsername("");
              setPassword("");
              setConfirmPassword("");
              setMobile("");
              setPasswordStrength("");
            }}
          >
            {isSignup ? "Login" : "Create account"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
