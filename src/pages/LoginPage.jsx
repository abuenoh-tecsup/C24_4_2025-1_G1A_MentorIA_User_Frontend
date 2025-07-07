import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, loginWithGoogle } from "../api/login.service";
import { useAuthStore } from "../store/auth.store";
import { GoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login: setAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ username, password });
      setAuth(data);
      navigate("/home");
    } catch (error) {
      alert("Login incorrecto");
      console.error(error);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    const { credential } = credentialResponse;
    try {
      const data = await loginWithGoogle(credential);
      setAuth(data);
      navigate("/home");
    } catch (err) {
      alert("Error al iniciar sesión con Google");
      console.error(err);
    }
  };

  return (
    <div className="row g-0 min-vh-100">
      {/* Panel izquierdo */}
      <div className="col-lg-6 background-gradient-1 d-flex align-items-center justify-content-center">
        <div className="text-center text-white">
          <i className="bi bi-mortarboard-fill mb-4 display-1"></i>
          <h1 className="display-4 fw-bold mb-3">MentorIA</h1>
          <p className="lead">Plataforma educativa inteligente</p>
        </div>
      </div>

      {/* Panel derecho */}
      <div className="col-lg-6 d-flex align-items-center justify-content-center p-5">
        <div style={{ maxWidth: "400px", width: "100%" }}>
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-2">Iniciar Sesión</h2>
            <p className="text-muted">Accede a tu cuenta para continuar</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-medium">Usuario</label>
              <div className="input-group login-input">
                <span className="input-group-text bg-light border-end-0">
                  <i className="bi bi-person-fill text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Ingresa tu usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-medium">Contraseña</label>
              <div className="input-group login-input">
                <span className="input-group-text bg-light border-end-0">
                  <i className="bi bi-lock-fill text-muted"></i>
                </span>
                <input
                  type="password"
                  className="form-control border-start-0"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 py-3 login-btn background-gradient-1"
            >
              Iniciar Sesión
            </button>
          </form>

          <div className="mt-4 text-center">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => alert("Error al autenticar con Google")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
