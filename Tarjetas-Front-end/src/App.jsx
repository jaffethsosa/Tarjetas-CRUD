import { useState } from 'react';
import TarjetaForm from './components/TarjetasForm';


function App() {
  return (
    <div className="container">
      <h1>CRUD de Tarjetas</h1>
      <TarjetaForm />
    </div>
  );
}

export default App;
