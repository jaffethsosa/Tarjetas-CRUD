import { useState } from "react";
import './style/TarjetasItem.css';

function TarjetaItem({ tarjeta, index, onEliminar, onActualizar }) {
  const [editando, setEditando] = useState(false);
  const [titulo, setTitulo] = useState(tarjeta.titulo);
  const [numero, setNumero] = useState(tarjeta.numero_tarjeta);
  // Cambiado a tarjeta.numero_tarjeta para evitar errores de undefined
  const [descripciones, setDescripciones] = useState(() => {
    return Array.isArray(tarjeta.descripciones) ? [...tarjeta.descripciones] : [];
  });


  const guardarCambios = () => {
    const actualizada = {
      ...tarjeta,
      titulo,
      numero_tarjeta: numero,
      descripciones: Array.isArray(descripciones) ? descripciones : [],
    };
    
    onActualizar(actualizada);
    setEditando(false);
    
  };

  const onEliminarTarjeta = () => {
    
    if (window.confirm('¿Está seguro de que desea eliminar esta tarjeta?')) {
      alert('Tarjeta eliminada con éxito');
      onEliminar(tarjeta.id);
      console.log('Tarjeta :', tarjeta.id);
    }
  }

  return (
    <div className="tarjeta-container">
      {editando ? (
        <>
          <input value={titulo} onChange={(e) => setTitulo(e.target.value)} />
          <input value={numero} onChange={(e) => setNumero(e.target.value)} />
          <ul>
            {descripciones.map((desc, i) => (
              <li key={i}>
                <input
                  value={desc}
                  onChange={(e) => {
                    const nuevasDescripciones = [...descripciones];
                    nuevasDescripciones[i] = e.target.value;
                    setDescripciones(nuevasDescripciones);
                  }}
                />
              </li>
            ))}
          </ul>
          <button onClick={guardarCambios}>Guardar</button>
          <button onClick={() => setEditando(false)}>Cancelar</button>
        </>
      ) : (
        <>
          <h3>{tarjeta.titulo}</h3>
          <p><strong>Numero:</strong> {tarjeta.numero_tarjeta}</p>
          <ul>
            {Array.isArray(tarjeta.descripciones) &&
              tarjeta.descripciones.map((desc, i) => <li key={i}>{desc}</li>)}
          </ul>
          <button onClick={onEliminarTarjeta}>Eliminar</button>
          <button onClick={() => setEditando(true)}>Actualizar</button>
        </>
      )}
    </div>
  );
}

export default TarjetaItem;
