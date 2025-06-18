import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="container-fluid header-container sticky-top ">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src="/favicon.ico"
              alt="Logo"
              height="24"
              className="d-inline-block align-text-top header-logo me-4 transform-scale-2"
            ></img>
            <h2 className="d-inline-block fw-bold text-airbnb text-white">MentorIA</h2>
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
            <div className="navbar-nav me-auto">
              <Link className="nav-link fw-bold text-white" to="/home">
                Home
              </Link>
              <Link className="nav-link fw-bold text-white" to="/items">
                Items
              </Link>
              <Link className="nav-link fw-bold text-white" to="/contact">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
