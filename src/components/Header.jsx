import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header-container">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src="/favicon.ico"
              alt="Logo"
              height="24"
              className="header-logo me-3 transform-scale-2"
            />
            <h2 className="header-title d-inline-block">MentorIA</h2>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar"
            aria-controls="navbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbar">
            <div className="navbar-nav ms-auto">
              <Link className="nav-link" to="/home">
                🏠 Home
              </Link>
              <Link className="nav-link" to="/items">
                📋 Items
              </Link>
              <Link className="nav-link" to="/contact">
                📞 Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;