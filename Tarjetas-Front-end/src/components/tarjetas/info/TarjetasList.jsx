import TarjetaItem from "./TarjetasItem";
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;


function TarjetaList({ tarjetas, setTarjetas, onEdit }) {
  const eliminarTarjeta = async (id) => {
    
    try {
      await axios.delete(`${API_URL}/tarjetas/${tarjeta.id}`);
      setTarjetas(prev => prev.filter(t => t._id !== id));
    } catch (error) {
      console.error('Error al eliminar tarjeta:', error);
    }
  };

  const actualizarTarjeta = (tarjeta) => {
    
    onEdit(tarjeta);
  };

  return (
    <div>
      {tarjetas.map((tarjeta, i) => (
        <TarjetaItem
          key={i}
          index={i}
          tarjeta={tarjeta}
          onEliminar={eliminarTarjeta}
          onActualizar={actualizarTarjeta}
        />
      ))}
    </div>
  );
}

export default TarjetaList;
