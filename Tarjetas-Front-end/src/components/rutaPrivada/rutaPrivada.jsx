import { Navigate } from 'react-router-dom';

function RutaPrivada({ children }) {
  const token = localStorage.getItem('tokenTarjeta'); // Obtener el token del localStorage
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default RutaPrivada;