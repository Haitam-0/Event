import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Support</h4>
          <p>Assistance technique</p>
          <p>Questions fréquentes</p>
          <p>Contactez-nous</p>
        </div>

        <div className="footer-section">
          <h4>Communauté</h4>
          <p>Événements à venir</p>
          <p>Partage d'expériences</p>
          <p>Forum des organisateurs</p>
        </div>

        <div className="footer-section">
          <h4>À propos</h4>
          <p>Qui sommes-nous ?</p>
          <p>Notre mission</p>
          <p>Nos partenaires</p>
        </div>

        <div className="footer-newsletter">
          <h4>Inscrivez-vous à notre newsletter</h4>
          <p>Recevez les dernières annonces et offres exclusives</p>
          <div className="newsletter-input">
            <input type="email" placeholder="Votre adresse email" />
            <button>S'inscrire</button>
          </div>
        </div>
      </div>

      <hr />

      <div className="footer-bottom">
        <p>© 2025 Gestion d'Événements, Inc. • <a href="#">Confidentialité</a> • <a href="#">Conditions</a></p>
        <div className="footer-icons">
          <span>EUR</span>
          <i className="fas fa-globe"></i>
          <i className="fab fa-facebook"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-instagram"></i>
        </div>
      </div>
    </footer>
  );
}

export default Footer;