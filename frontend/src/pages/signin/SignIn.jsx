import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SignIn.css'; // Assuming your CSS file is SignIn.css for styling
import axios from "axios";

function CreerUnCompte() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // For showing loading state
  const [successMessage, setSuccessMessage] = useState(""); // For success message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation check
    if (!username || !email || !password) {
      setErrorMessage("Tous les champs sont obligatoires!");
      return;
    }

    setLoading(true); // Start loading

    // Make API request to register the user
    try {
      const response = await axios.post("http://localhost:5000/api/users/register", {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        setSuccessMessage("Votre compte a été créé avec succès! Redirection vers la page de connexion...");
        setTimeout(() => {
          navigate("/login"); // Redirect after 2 seconds
        }, 2000);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="signup-container">
      <h2>Créer un compte</h2>

      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <label>Nom d'utilisateur</label>
        <input
          type="text"
          placeholder="Entrez votre nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="Entrez votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Mot de passe</label>
        <input
          type="password"
          placeholder="Entrez votre mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Chargement..." : "Créer un compte"}
        </button>
      </form>

      <p>
        Vous avez déjà un compte? <a href="/login">Se connecter</a>
      </p>
    </div>
  );
}

export default CreerUnCompte;
