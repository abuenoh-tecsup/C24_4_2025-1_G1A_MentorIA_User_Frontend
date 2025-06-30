import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 importar
import { login } from "../api/login.service";
import { useAuthStore } from "../store/auth.store";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login: setAuth } = useAuthStore();
  const navigate = useNavigate(); // 👈 instancia para redirección

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ username, password });
      setAuth(data); // guarda token, username, etc.
      navigate("/home"); // 👈 redirigir a /home
    } catch (error) {
      alert("Login incorrecto");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Iniciar sesión</button>
    </form>
  );
}
