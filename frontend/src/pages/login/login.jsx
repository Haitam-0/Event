import React from "react";
import "./Login.css";
import { FaGoogle, FaFacebookF, FaApple, FaEye } from "react-icons/fa";

function Login() {
  return (
    <div className="login-container">
      {/* Left side with image */}
      <div className="login-image"></div>

      {/* Right side with form */}
      <div className="login-form">
        <p className="register-text">
          avez-vous déjà un compte? <a href="#">se connecter</a>
        </p>

        <h2 className="title">se connecter</h2>

        <div className="social-login">
          <button className="google">
            <FaGoogle className="icon" /> se connecter avec google
          </button>
          <button className="facebook">
            <FaFacebookF className="icon" /> se connecter avec facebook
          </button>
          <button className="apple">
            <FaApple className="icon" /> se connecter avec apple
          </button>
        </div>

        <div className="divider">
          <span>OR</span>
        </div>

        <form>
          <label>Email</label>
          <input type="email" placeholder="example.email@gmail.com" />

          <label>Mot De Passe</label>
          <div className="password-field">
            <input type="password" placeholder="entrer 8+ caractère" />
            <FaEye className="eye-icon" />
          </div>

          <button type="submit" className="submit-btn">
            se connecter
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;