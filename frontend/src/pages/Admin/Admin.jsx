import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state to wait for token check
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));

        if (decoded.role === "admin") {
          setIsAdmin(true);
        } else {
          navigate("/"); // Redirect to home if not admin
        }
      } catch (error) {
        navigate("/login"); // Invalid token
      }
    }

    setLoading(false); // Once check is done, set loading to false
  }, [navigate]);

  if (loading) {
    return <p>Loading...</p>; // Show a loading message while checking
  }

  if (!isAdmin) {
    return null; // Or show a loading spinner or a "Not authorized" message
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome to the Admin Dashboard</p>
      {/* Add your admin functionality here */}
    </div>
  );
}

export default AdminDashboard;
