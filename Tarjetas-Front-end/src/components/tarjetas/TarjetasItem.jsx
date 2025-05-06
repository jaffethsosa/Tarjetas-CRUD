function TarjetaItem({ tarjeta, index, onEliminar }) {
    return (
      <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
        <h3>{tarjeta.titulo}</h3>
        <p><strong>Número:</strong> {tarjeta.numero}</p>
        <ul>
          {tarjeta.descripciones.map((desc, i) => <li key={i}>{desc}</li>)}
        </ul>
        <button onClick={() => onEliminar(index)}>Eliminar</button>
      </div>
    );
  }
  
  export default TarjetaItem;
  