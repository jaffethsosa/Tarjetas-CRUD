import './style/TarjetasForm.css';

function TarjetaForm() {
  return (
    <form className="tarjeta-form">
      <h2>Crear Tarjeta</h2>
      <input
        placeholder="Título"
        type="text"
        className="tarjeta-input"
      />
      <input
        placeholder="Número"
        type="text"
        className="tarjeta-input"
      />
      <input
        placeholder="Descripción"
        type="text"
        className="tarjeta-input"
      />
      <div className="tarjeta-buttons">
        <button type="button" className="btn sec">Agregar descripción</button>
        <button type="submit" className="btn">Guardar tarjeta</button>
      </div>
    </form>
  );
}

export default TarjetaForm;

