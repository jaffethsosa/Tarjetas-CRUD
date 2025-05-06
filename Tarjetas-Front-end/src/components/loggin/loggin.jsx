import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./styles/Loggin.css";

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({ email: "", password: "" }); // Estado para el usuario
  const [loading, setLoading] = useState(false); // Estado para el loading (tiempo de carga)
  const [error, setError] = useState(null); // Estado para el error

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    axios
      .post("http://localhost:3000/auth/login", user) // Cambiar la URL según el backend
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("tokenTarjeta", token); // Guradado del token
        console.log("Token guardado:", token);
        navigate("/"); // Redirigir al home
      })
      .catch((err) => {
        setError(err.response?.data?.error || "Error desconocido"); // Manejo de errores
        setLoading(false);
      });
  };

  // Verificar si existe token en el localStorage
  if (localStorage.getItem("tokenTarjeta")) {
    return <Navigate to="/" />;
  }

  return (
    <div className="title">
      <h1>Bienvenido a CriptoSOSA</h1>
      <div className="login-container">
        <h1>Iniciar sesión</h1>
        <form onSubmit={submit}>
          <div className="field">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              required
              type="email"
              name="email"
              onChange={(e) =>
                setUser({ ...user, email: e.target.value })
              }
            />
          </div>
          <div className="field">
            <label htmlFor="password">Contraseña</label>
            <input
              required
              type="password"
              name="password"
              onChange={(e) =>
                setUser({ ...user, password: e.target.value })
              }
            />
          </div>
          <div className="submi">
            <input
              type="submit"
              value={loading ? "Cargando..." : "Ingresar"} // Notificacion de estado de login
              className="link"
            />
          </div>
        </form>
        {error && <span className="error">Error: {error}</span>}
      </div>
    </div>
  );
};

export default Login;
