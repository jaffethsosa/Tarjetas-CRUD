import { Outlet, Navigate } from "react-router-dom";
import Home from "../home";

function App() {


  return (
    <div>
      <h1>Tarjetas Sosa</h1>
      <Outlet /> 
    </div>
  );
};

export default App;
