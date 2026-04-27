# Sistema de Paquetes de Viajes API

API REST para la gestión de usuarios, paquetes turísticos, reservas, destinos, países y categorías.

---

## 🚀 Tecnologías

- Node.js
- Express
- TypeScript
- TypeORM
- PostgreSQL
- Zod (validación)
- JWT (autenticación)
- Swagger (documentación)

---

## 📦 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/asanti1/webdev_up_1c_2026_back
cd backend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Renombrar `.env.example` a `.env`
Renombrar docker-compose.example.yml a docker-compose.yml

---

## 🐳 Ejecutar con Docker

```bash
docker compose up --build
```

La API estará disponible en:

http://localhost:8000

---

## 📚 Documentación (Swagger)

Disponible en:

http://localhost:8000/docs

---

## 🔐 Autenticación

1. Realizar login en:

POST /auth/login

2. Copiar el token JWT

3. Usarlo en Swagger con:

Authorize → Bearer <token>

---

## 👤 Usuarios de prueba

### ADMIN

```json
{
  "email": "admin@test.com",
  "password": "123456"
}
```

### USUARIO

```json
{
  "email": "user1@test.com",
  "password": "123456"
}
```

---

## 🧩 Endpoints principales

- Auth
- Users
- Packages
- Reservations
- Destinations
- Countries
- CategoryPackages

---

## ⚠️ Notas

- Algunas rutas requieren rol **ADMIN**
- Algunas eliminaciones son **lógicas**
- Los errores se devuelven en formato JSON consistente
