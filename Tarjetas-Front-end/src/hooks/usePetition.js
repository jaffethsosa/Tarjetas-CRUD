import axios from "axios";
import { use, useEffect } from "react";


const usePetition =(endpoint)=> {

    const API_URL = import.meta.env.VITE_API_URL; // URL de la API desde el archivo .env

    const [data, setData] = useState(null); // Estado para almacenar los datos
    const [loading, setLoading] = useState(true); // Estado para el loading (tiempo de carga)

    useEffect(()=>{
        setLoading(true); // Iniciar el loading
        
        axios.get(`${API_URL}${endpoint}`) // Realizar la petición GET a la API
            .then(data => {
                setData(data.data); // Almacenar los datos en el estado
                setLoading(false); // Finalizar el loading
            })
            .catch((err)=>{
                console.error(err); // Manejo de errores
                setLoading(false); // Finalizar el loading
            });
    }, []); 

    return {data, loading}; // Retornar los datos y el estado de loading
}

export default usePetition; 