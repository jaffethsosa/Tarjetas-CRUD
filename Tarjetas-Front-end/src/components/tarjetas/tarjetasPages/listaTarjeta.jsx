import { useEffect, useState } from "react";
import axios from "axios";
import TarjetaList from "../info/TarjetasList";

function ListaTarjetaPage() {
    const [tarjetas, setTarjetas] = useState([]);

    useEffect(() => {
        const fetchTarjetas = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL;
                const response = await axios.get(`${apiUrl}/tarjetas`);
                setTarjetas(response.data);
            } catch (error) {
                console.error("Error al obtener las tarjetas:", error);
            }
        };

        fetchTarjetas();
    }, []);

    return (
        <div className="listaTarjetaPage">
            <h1>Listado de tarjetas</h1>
            {
                tarjetas.length === 0 ? (
                    <p>No hay tarjetas disponibles.</p>
                ) : (
                    <TarjetaList tarjetasParams={tarjetas} />
                )
            }
            
        </div>
    );
}

export default ListaTarjetaPage;
