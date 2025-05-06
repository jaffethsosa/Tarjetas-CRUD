import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Pagina404 from './components/404.jsx'
import Login from './components/loggin/loggin.jsx'
import App from './components/App.jsx'
import Home from './home.jsx'
import RutaPrivada from './components/rutaPrivada/rutaPrivada.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <RutaPrivada>
            <App />
          </RutaPrivada>
        }
      >
        <Route index element={<Home />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Pagina404 />} />
    </Routes>
  </BrowserRouter>

)
