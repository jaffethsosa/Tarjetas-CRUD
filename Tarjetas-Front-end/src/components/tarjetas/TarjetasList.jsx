import TarjetaItem from "./TarjetasItem";


function TarjetaList({ tarjetas, onEliminar }) {
  return (
    <div>
      {tarjetas.map((tarjeta, i) => (
        <TarjetaItem key={i} index={i} tarjeta={tarjeta} onEliminar={onEliminar} />
      ))}
    </div>
  );
}

export default TarjetaList;
