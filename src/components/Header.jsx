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
    <header className="background-gradient-1 text-white sticky-top">
      {/* Mobile Header - Horizontal */}
      <nav className="navbar navbar-expand-lg navbar-dark d-lg-none">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/home">
            <img
              src="/favicon.ico"
              alt="Logo"
              style={{ height: "30px" }}
              className="me-2"
            />
            <span className="fw-bold">MentorIA</span>
          </Link>
          
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mobileNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="mobileNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  <i className="bi bi-house-fill me-1"></i>Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  <i className="bi bi-telephone-fill me-1"></i>Contact
                </Link>
              </li>
              <li className="nav-item">
                {token ? (
                  <div className="dropdown">
                    <button
                      className="btn btn-link nav-link dropdown-toggle text-white text-decoration-none"
                      data-bs-toggle="dropdown"
                    >
                      <i className="bi bi-person-fill me-1"></i>
                      {user.username}
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <button className="dropdown-item" onClick={handleLogout}>
                          <i className="bi bi-box-arrow-right me-1"></i>Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <Link className="nav-link" to="/login">
                    🔐 Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Desktop Sidebar - Vertical */}
      <nav className="d-none d-lg-flex flex-column vh-100 p-3 sticky-top" style={{ width: "200px" }}>
        {/* Logo */}
        <Link
          className="navbar-brand d-flex flex-column align-items-center text-decoration-none mb-4"
          to="/home"
        >
          <img
            src="/favicon.ico"
            alt="Logo"
            style={{ height: "50px" }}
            className="mb-2"
          />
          <span className="fw-bold text-white">MentorIA</span>
        </Link>

        {/* Navigation Links */}
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item mb-2">
            <Link
              className="nav-link text-white d-flex align-items-center"
              to="/home"
            >
              <i className="bi bi-house-fill me-3"></i>
              <span>Home</span>
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link
              className="nav-link text-white d-flex align-items-center"
              to="/contact"
            >
              <i className="bi bi-telephone-fill me-3"></i>
              <span>Contact</span>
            </Link>
          </li>
        </ul>

        {/* User Section */}
        <div className="border-top border-secondary pt-3">
          {token ? (
            <div>
              <div className="text-white-50 d-flex align-items-center mb-2">
                <i className="bi bi-person-fill me-3"></i>
                <span>{user.username}</span>
              </div>
              <button
                className="btn btn-link text-white text-decoration-none d-flex align-items-center p-0"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right me-3"></i>
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <Link
              className="nav-link text-white d-flex align-items-center"
              to="/login"
            >
              <span className="me-3">🔐</span>
              <span>Login</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;