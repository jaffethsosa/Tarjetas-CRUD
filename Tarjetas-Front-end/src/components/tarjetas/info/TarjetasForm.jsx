import { useState } from 'react';
import axios from 'axios';
import './style/TarjetasForm.css';

function TarjetaForm() {
  const [titulo, setTitulo] = useState('');
  const [numero, setNumero] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [descripciones, setDescripciones] = useState([]);

  const agregarDescripcion = () => {
    if (descripcion.trim()) {
      setDescripciones([...descripciones, descripcion.trim()]);
      setDescripcion('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        titulo,
        numero_tarjeta: numero,
        descripciones,
      };

      const response = await axios.post('http://localhost:3000/tarjetas', data);
      alert(response.data.message || 'Tarjeta creada con éxito');

      // Limpiar campos después de enviar
      setTitulo('');
      setNumero('');
      setDescripcion('');
      setDescripciones([]);
    } catch (error) {
      console.error(error);
      alert('Ocurrió un error al guardar la tarjeta');
    }
  };

  return (
    <form className="tarjeta-form" onSubmit={handleSubmit}>
      <h2>Crear Tarjeta</h2>

      <input
        placeholder="Título"
        type="text"
        className="tarjeta-input"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />

      <input
        placeholder="Número"
        type="text"
        className="tarjeta-input"
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
      />

      <input
        placeholder="Descripción"
        type="text"
        className="tarjeta-input"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />

      <div className="tarjeta-buttons">
        <button type="button" className="btn sec" onClick={agregarDescripcion}>
          Agregar descripción
        </button>
        <button type="submit" className="btn">
          Guardar tarjeta
        </button>
      </div>

      {descripciones.length > 0 && (
        <ul>
          {descripciones.map((desc, i) => (
            <li key={i}>{desc}</li>
          ))}
        </ul>
      )}
    </form>
  );
}

export default TarjetaForm;


