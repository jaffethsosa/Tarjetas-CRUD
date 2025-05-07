import TarjetaItem from "./TarjetasItem";
import { useState } from "react";
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

function TarjetaList({ tarjetasParams }) {

  const [tarjetas, setTarjetas] = useState(tarjetasParams ?? []);

  const eliminarTarjeta = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/tarjetas/${id}`);
      if(response.data.message != "Tarjeta y descripciones eliminadas correctamente") {
        alert('Error al eliminar tarjeta: ' + response.data.message);
        return;
      }
      // Filtrar la tarjeta eliminada de la lista
      setTarjetas(prev => prev.filter(t => t.id !== id));
      
      alert('Tarjeta eliminada con éxito');

    } catch (error) {
      console.error('Error al eliminar tarjeta:', error);
    }
  };

  const actualizarTarjeta = async (tarjetaActualizada) => {
    try {
      const response = await axios.put(`${API_URL}/tarjetas/${tarjetaActualizada.id}`, tarjetaActualizada);

      if (response.data.message != "Tarjeta actualizada correctamente") {
        alert('Error al actualizar tarjeta: ' + response.data.message);
        return;
      }
      alert('Tarjeta actualizada con éxito');

      setTarjetas((prevTarjetas) =>
        prevTarjetas.map((t) => (t.id === tarjetaActualizada.id ? tarjetaActualizada : t))
      );

    } catch (error) {
      console.error('Error al actualizar tarjeta:', error);
    }
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
