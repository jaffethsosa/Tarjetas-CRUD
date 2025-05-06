import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './main.css'

import Pagina404 from './components/404.jsx'
import Login from './components/loggin/loggin.jsx'
import App from './components/App.jsx'
import Home from './home.jsx'
import RutaPrivada from './components/rutaPrivada/rutaPrivada.jsx'
import crearTarjetaPage from './components/crearTarjeta/crearTarjeta.jsx'
import TarjetaForm from './components/tarjetas/TarjetasForm.jsx'

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
      </Route>

      <Route path="/tarjetas" element={<App />}>
        <Route index element={<crearTarjetaPage />} />
        <Route path='crear' element={<TarjetaForm />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Pagina404 />} />
    </Routes>
  </BrowserRouter>

)
