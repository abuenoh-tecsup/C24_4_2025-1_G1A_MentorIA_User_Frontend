import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

function Header() {
  const { token, logout, username } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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

              {token ? (
                <>
                  <span className="nav-link disabled">👤 {username}</span>
                  <button
                    className="nav-link btn btn-link"
                    onClick={handleLogout}
                  >
                    🔓 Logout
                  </button>
                </>
              ) : (
                <Link className="nav-link" to="/login">
                  🔐 Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
