import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './main.css'

import Pagina404 from './components/404.jsx'
import Login from './components/loggin/loggin.jsx'
import App from './components/App.jsx'
import Home from './home.jsx'
import RutaPrivada from './components/rutaPrivada/rutaPrivada.jsx'
import ListaTarjetaPage from './components/tarjetas/tarjetasPages/listaTarjeta.jsx';
import CrearTarjetaPage from './components/tarjetas/tarjetasPages/crearTarjeta.jsx';
import TarjetaForm from './components/tarjetas/info/TarjetasForm.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={
        <RutaPrivada>
          <App />
        </RutaPrivada>
      }
      >
        <Route index element={<Home />} />

        <Route path="/tarjetas">
          <Route index element={<CrearTarjetaPage />} />
          <Route path="crear" element={<TarjetaForm />} />
          <Route path="lista" element={<ListaTarjetaPage />} />
        </Route>

      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Pagina404 />} />
    </Routes>
  </BrowserRouter>

)
