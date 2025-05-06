

function TarjetaForm() {
    return (
      <form>
        <input
          placeholder="Título"
          type="text"
        />
        <input
          placeholder="Número"
          type="text"
        />
        <input
          placeholder="Descripción"
          type="text"
        />
        <button type="button">Agregar descripción</button>
        <button type="submit">Guardar tarjeta</button>
      </form>
    );
  }
  
  export default TarjetaForm;
  
