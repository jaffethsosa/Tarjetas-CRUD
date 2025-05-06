import { useState } from 'react';
import axios from 'axios';
import './styles/loggin.css'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [isError, setIsError] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensaje('');
    setIsError(false);

    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem('token', token); // Guarda el token en localStorage
      setMensaje(`✅ Bienvenido, ${user.email}`);
     } catch (err) {
        console.error('❌ Error al iniciar sesión:', err.response ? err.response.data : err);
        setMensaje('Error al iniciar sesión. Verifica tu correo y contraseña.');
        setIsError(true);
      }
      
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Iniciar sesión</button>
      </form>
      <p className={isError ? "" : "success"}>{mensaje}</p>
    </div>
  );
}

export default Login;
