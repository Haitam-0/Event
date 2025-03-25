import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css"; // Include the CSS file for styling

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      const { accessToken, role } = response.data; // Assume 'role' is part of the response

      localStorage.setItem("authToken", accessToken); // Store token

      // Redirect to different pages based on role
      if (role === "admin") {
        navigate("/admin"); // Redirect to admin page if role is admin
      } else {
        navigate("/"); // Redirect to home page for normal users
      }
    } catch (err) {
      setError("Email ou mot de passe incorrect");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="login-container">
      {/* Left side with image */}
      <div className="login-image"></div>

      {/* Right side with form */}
      <div className="login-form">
        <p className="register-text">
          Vous n'avez pas de compte ? <a href="/signin">Créer un compte</a>
        </p>

        <h2 className="title">Se connecter</h2>

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="example.email@gmail.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Mot de passe</label>
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Entrer 8+ caractères"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="eye-icon" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
