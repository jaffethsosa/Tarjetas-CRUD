import './style/TarjetasItem.css';

function TarjetaItem({ tarjeta, index, onEliminar, onActualizar }) {
  return (
    <div className="tarjeta-container">
      <h3>{tarjeta.titulo}</h3>
      <p><strong>Numero:</strong> {tarjeta.numero_tarjeta}</p>
      <ul>
        {tarjeta.descripciones.map((desc, i) => <li key={i}>{desc}</li>)}
      </ul>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={() => onEliminar(tarjeta._id)}>Eliminar</button>
        <button onClick={() => onActualizar(tarjeta)}>Actualizar</button>
      </div>
    </div>
  );
}

export default TarjetaItem;
