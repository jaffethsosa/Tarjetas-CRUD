import TarjetaForm from "./components/tarjetas/TarjetasForm";

const Home = () => {
    return (
        <div className="home-container">
            <h1>Hola, Bienvenido a TarjetasSosa</h1>
            <p>El mejor organizador de Tarjetas</p>
            
            <TarjetaForm />
        </div>
    );
}

export default Home;