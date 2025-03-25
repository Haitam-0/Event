import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom"; // useNavigate for redirection
import { FaGlobe, FaEnvelope, FaBell, FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if the user is logged in by looking for the auth token
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      setIsLoggedIn(true); // User is logged in
    } else {
      setIsLoggedIn(false); // User is logged out
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token on logout
    setIsLoggedIn(false); // Update the logged-in state
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="NAV">
      {/* Logo Section */}
      <div className="LOGO">
        EventCo
      </div>

      {/* Navigation Links */}
      <div className="Containe">
        <Link to="/">Acceuil</Link>
        <Link to="/events">Événement</Link>
        <Link to="/Reserver">Faire une réservation</Link>
        <Link to="cart">Mes Réservations</Link>
      </div>

      {/* Icons Section */}
      <div className="Icons">
        <p>MAD</p>
        <FaGlobe className="icon" /> {/* Internet Icon */}
        <FaEnvelope className="icon" /> {/* Messages Icon */}
        <FaBell className="icon" /> {/* Notification Icon */}
        
        {isLoggedIn ? (
          // If logged in, show logout button
          <button onClick={handleLogout} className="icon">
            Déconnexion
          </button>
        ) : (
          // If not logged in, show login icon
          <Link to="/login">
            <FaUserCircle className="icon" />
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
