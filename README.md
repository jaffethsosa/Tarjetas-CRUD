# 📦 Proyecto Backend NestJS - Gestión de Tarjetas

Este proyecto es una API RESTful desarrollada con **NestJS**, que permite gestionar un sistema de tarjetas con operaciones completas de CRUD, documentación integrada con Swagger, y logging de eventos.

## 🚀 Tecnologías

- **NestJS**
- **Swagger/OpenAPI**
- **TypeScript**
- **Axios (para testing desde frontend)**
- **MySQL (como base de datos)**

## ✨ Características

- CRUD de tarjetas (`GET`, `POST`, `PUT`, `DELETE`)
- Documentación automática con Swagger (`/api`)
- Logging de eventos exitosos y errores en archivos separados
- Estructura modular y escalable
- Soporte para CORS (habilitado para `http://localhost:5173`)
  
## 📄 Logging

Se generan automáticamente dos archivos:

- `success.log`: Para eventos completados exitosamente.
- `error.log`: Para errores del sistema o validaciones.

## 🛠 Cómo ejecutar

```bash
# Instalar dependencias
npm install - backend
yarn install - frontend

# Ejecutar en desarrollo
nest start - backend
yarn dev - frontend

