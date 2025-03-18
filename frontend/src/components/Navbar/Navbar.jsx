import "./Navbar.css";
import { Link } from "react-router-dom";
import { FaGlobe, FaEnvelope, FaBell ,FaUserCircle } from "react-icons/fa";

function Navbar() {
  return (
    <div className="NAV">
      {/* Logo Section */}
      <div className="LOGO">
        <img src="logo" alt="logo" />
      </div>

      {/* Navigation Links */}
      <div className="Containe">
        <Link to="/">Acceuil</Link>
        <Link to="/evenement">Événement</Link>
        <Link to="/reservation">Faire une réservation</Link>
        <Link to="/mes-reservations">Mes Réservations</Link>
      </div>

      {/* Icons Section */}
      <div className="Icons">
        <p>MAD</p>
        <FaGlobe className="icon" /> {/* Internet Icon */}
        <FaEnvelope className="icon" /> {/* Messages Icon */}
        <FaBell className="icon" /> {/* Notification Icon */}
        <FaUserCircle className="icon" /> {/* Notification Icon */}
      </div>
    </div>
  );
}

export default Navbar;
