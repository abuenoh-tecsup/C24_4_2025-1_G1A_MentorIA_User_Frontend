import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

function Header() {
  const { token, logout, user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header-container text-white fixed-top">
      <nav className="navbar navbar-expand-lg navbar-dark flex-lg-column align-items-start p-3 p-lg-0 h-lg-100">
        {/* Logo y toggle button */}
        <div className="d-flex w-100 justify-content-between align-items-center mb-lg-4">
          <Link
            className="navbar-brand d-flex flex-column align-items-center text-decoration-none m-0"
            to="/home"
          >
            <img
              src="/favicon.ico"
              alt="Logo"
              className="img-fluid"
              style={{ maxHeight: "40px", maxWidth: "100%" }}
            />
            <span className="fs-6 fw-bold d-none d-lg-inline text-white text-center pt-2">
              MentorIA
            </span>
          </Link>
          <button
            className="navbar-toggler d-lg-none border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        {/* Navigation items */}
        <div
          className="collapse navbar-collapse w-100 flex-grow-1"
          id="navbarContent"
        >
          <ul className="navbar-nav flex-column w-100">
            <li className="nav-item">
              <Link
                className="nav-link d-flex flex-column align-items-center gap-2 px-3 py-2 hover-bg-light m-0"
                to="/home"
              >
                <span className="">🏠</span>
                <span>Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link d-flex flex-column align-items-center gap-2 px-3 py-2 hover-bg-light m-0"
                to="/items"
              >
                <span>📋</span>
                <span>Items</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link d-flex flex-column align-items-center gap-2 px-3 py-2 hover-bg-light m-0"
                to="/contact"
              >
                <span>📞</span>
                <span>Contact</span>
              </Link>
            </li>

            {/* Separador y sección de usuario */}
            <li className="nav-item mt-auto pt-5 border-top border-secondary">
              {token ? (
                <div className="d-flex flex-column gap-1">
                  <div className="nav-link d-flex flex-column align-items-center gap-2 px-3 py-2 text-white-50">
                    <span>👤</span>
                    <span className="">{user.username}</span>
                  </div>
                  <button
                    className="nav-link btn btn-link text-start text-white d-flex flex-column align-items-center gap-2 px-3 py-2 rounded hover-bg-light border-0"
                    onClick={handleLogout}
                  >
                    <span>🔓</span>
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  className="nav-link d-flex align-items-center gap-2 px-3 py-2 rounded hover-bg-light"
                  to="/login"
                >
                  <span>🔐</span>
                  <span>Login</span>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
