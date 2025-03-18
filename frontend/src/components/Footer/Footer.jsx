import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Support</h4>
          <p>Irure in molli</p>
          <p>Officia sit laborum</p>
          <p>Lorem ea quis labore</p>
        </div>

        <div className="footer-section">
          <h4>Community</h4>
          <p>Nisi velit ut</p>
          <p>Pariatur elit esse</p>
          <p>Laborum aliquip do</p>
        </div>

        <div className="footer-section">
          <h4>About</h4>
          <p>Aute com</p>
          <p>Volupta</p>
          <p>Nulla min</p>
        </div>

        <div className="footer-newsletter">
          <h4>Subscribe to our newsletter</h4>
          <p>For announcements and exclusive deals</p>
          <div className="newsletter-input">
            <input type="email" placeholder="Input your email" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>

      <hr />

      <div className="footer-bottom">
        <p>© 2022 Company, Inc. • <a href="#">Privacy</a> • <a href="#">Terms</a></p>
        <div className="footer-icons">
          <span>USD</span>
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
