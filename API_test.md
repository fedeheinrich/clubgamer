# API Test - Club Gamer

Guía de pruebas manuales para la API REST del backend utilizando cURL y Postman.

---

# 🚀 Configuración Inicial

## Variables de Entorno para Testing

```bash
export API_URL="http://localhost:3001/api"
export BASE_URL="http://localhost:3001"

echo "API URL: $API_URL"
echo "Base URL: $BASE_URL"
```

---

# 🔍 Health Checks y Verificación

## Verificar que el backend esté funcionando

### GET /health

```bash
curl -X GET $BASE_URL/health
```

Respuesta esperada:

```json
{
  "status": "OK",
  "timestamp": "2026-XX-XXTXX:XX:XX.XXXZ",
  "uptime": 123.45
}
```

Código esperado:

```txt
200 OK
```

---

### GET /api/health

```bash
curl -X GET $API_URL/health
```

Respuesta esperada:

```json
{
  "status": "OK",
  "message": "API funcionando correctamente",
  "timestamp": "2026-XX-XXTXX:XX:XX.XXXZ",
  "environment": "development"
}
```

Código esperado:

```txt
200 OK
```

---

### GET /api/test

```bash
curl -X GET $API_URL/test
```

Respuesta esperada:

```json
{
  "message": "Endpoint de prueba",
  "data": {
    "backend": "Express",
    "database": "PostgreSQL",
    "orm": "Sequelize"
  }
}
```

Código esperado:

```txt
200 OK
```

---

# 🎮 Plataformas

## Obtener todas las plataformas

### GET /api/plataformas

```bash
curl -X GET $API_URL/plataformas
```

Código esperado:

```txt
200 OK
```

---

## Obtener plataforma por ID

### GET /api/plataformas/1

```bash
curl -X GET $API_URL/plataformas/1
```

Código esperado:

```txt
200 OK
```

---

## Crear plataforma

### POST /api/plataformas

```bash
curl -X POST $API_URL/plataformas \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "PlayStation 5",
    "slug": "playstation5",
    "id_rawg": 187
  }'
```

Respuesta esperada:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "nombre": "PlayStation 5",
    "slug": "playstation5",
    "id_rawg": 187
  }
}
```

Código esperado:

```txt
201 Created
```

---

## Actualizar plataforma

### PUT /api/plataformas/1

```bash
curl -X PUT $API_URL/plataformas/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "PlayStation 5 Pro",
    "slug": "playstation5-pro",
    "id_rawg": 187
  }'
```

Código esperado:

```txt
200 OK
```

---

## Eliminar plataforma

### DELETE /api/plataformas/1

```bash
curl -X DELETE $API_URL/plataformas/1
```

Código esperado:

```txt
200 OK
```

---

# 🏷️ Géneros

## Obtener todos los géneros

### GET /api/generos

```bash
curl -X GET $API_URL/generos
```

Código esperado:

```txt
200 OK
```

---

## Obtener género por ID

### GET /api/generos/1

```bash
curl -X GET $API_URL/generos/1
```

Código esperado:

```txt
200 OK
```

---

## Crear género

### POST /api/generos

```bash
curl -X POST $API_URL/generos \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "RPG",
    "slug": "rpg",
    "id_rawg": 4
  }'
```

Respuesta esperada:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "nombre": "RPG",
    "slug": "rpg",
    "id_rawg": 4
  }
}
```

Código esperado:

```txt
201 Created
```

---

## Actualizar género

### PUT /api/generos/1

```bash
curl -X PUT $API_URL/generos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Action RPG",
    "slug": "action-rpg",
    "id_rawg": 4
  }'
```

Código esperado:

```txt
200 OK
```

---

## Eliminar género

### DELETE /api/generos/1

```bash
curl -X DELETE $API_URL/generos/1
```

Código esperado:

```txt
200 OK
```

---

# 🎮 Videojuegos

## Obtener todos los videojuegos

### GET /api/videojuegos

```bash
curl -X GET $API_URL/videojuegos
```

Código esperado:

```txt
200 OK
```

---

## Obtener videojuego por ID

### GET /api/videojuegos/1

```bash
curl -X GET $API_URL/videojuegos/1
```

Código esperado:

```txt
200 OK
```

---

## Crear videojuego

### POST /api/videojuegos

```bash
curl -X POST $API_URL/videojuegos \
  -H "Content-Type: application/json" \
  -d '{
    "id_rawg": 124562,
    "titulo": "Elden Ring",
    "slug": "elden-ring",
    "lanzamiento": "2022-02-25",
    "url_imagen": "https://media.rawg.io/media/games/elden-ring.jpg",
    "calificacion_global": 4.5
  }'
```

Respuesta esperada:

```json
{
  "success": true,
  "mensaje": "Juego creado localmente",
  "data": {
    "id": 1,
    "titulo": "Elden Ring"
  }
}
```

Código esperado:

```txt
201 Created
```

---

## Actualizar videojuego

### PUT /api/videojuegos/1

```bash
curl -X PUT $API_URL/videojuegos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Elden Ring Updated",
    "slug": "elden-ring-updated",
    "lanzamiento": "2022-02-25",
    "url_imagen": "https://media.rawg.io/media/games/elden-ring.jpg",
    "calificacion_global": 4.8
  }'
```

Código esperado:

```txt
200 OK
```

---

## Eliminar videojuego

### DELETE /api/videojuegos/1

```bash
curl -X DELETE $API_URL/videojuegos/1
```

Código esperado:

```txt
200 OK
```

---

# 📚 Colecciones

## Obtener colección de usuario

### GET /api/colecciones

```bash
curl -X GET $API_URL/colecciones
```

Código esperado:

```txt
200 OK
```

---

## Agregar videojuego a la colección

### POST /api/colecciones

```bash
curl -X POST $API_URL/colecciones \
  -H "Content-Type: application/json" \
  -d '{
    "id_usuario": 1,
    "id_juego": 1,
    "estado": "pendiente",
    "calificacion_personal": null,
    "tiempo_de_juego_horas": 0
  }'
```

Respuesta esperada:

```json
{
  "success": true,
  "mensaje": "Videojuego añadido a tu colección con éxito."
}
```

Código esperado:

```txt
201 Created
```

---

## Actualizar progreso de un videojuego

### PUT /api/colecciones/1

```bash
curl -X PUT $API_URL/colecciones/1 \
  -H "Content-Type: application/json" \
  -d '{
    "id_usuario": 1,
    "estado": "jugando",
    "calificacion_personal": 5,
    "tiempo_de_juego_horas": 25
  }'
```

Respuesta esperada:

```json
{
  "success": true,
  "mensaje": "Progreso de la colección actualizado"
}
```

Código esperado:

```txt
200 OK
```

> Nota: `calificacion_personal` acepta valores entre **1 y 5**.

---

## Eliminar videojuego de la colección

### DELETE /api/colecciones/1

```bash
curl -X DELETE $API_URL/colecciones/1 \
  -H "Content-Type: application/json" \
  -d '{
    "id_usuario": 1
  }'
```

Código esperado:

```txt
200 OK
```

---

# 👤 Usuarios

## Obtener todos los usuarios

### GET /api/usuarios

```bash
curl -X GET $API_URL/usuarios
```

Código esperado:

```txt
200 OK
```

---

## Actualizar usuario

### PUT /api/usuarios/1

```bash
curl -X PUT $API_URL/usuarios/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Usuario Actualizado",
    "email": "actualizado@example.com"
  }'
```

Código esperado:

```txt
200 OK
```

---

## Eliminar usuario

### DELETE /api/usuarios/1

```bash
curl -X DELETE $API_URL/usuarios/1
```

Código esperado:

```txt
200 OK
```

---

# 🔐 Autenticación

## Registro de usuario

### POST /api/auth/register

```bash
curl -X POST $API_URL/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Usuario Test",
    "email": "test@example.com",
    "password": "123456"
  }'
```

Código esperado:

```txt
201 Created
```

> Estado actual del proyecto: endpoint en desarrollo. El controlador aún contiene lógica pendiente de implementación.

---

## Login de usuario

### POST /api/auth/login

```bash
curl -X POST $API_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "123456"
  }'
```

Código esperado:

```txt
200 OK
```

> Estado actual del proyecto: endpoint en desarrollo. El controlador aún contiene lógica pendiente de implementación.

---

## Perfil de usuario

### GET /api/auth/perfil

```bash
curl -X GET $API_URL/auth/perfil
```

Código esperado:

```txt
200 OK
```

> Requiere autenticación JWT válida.

---

# ❌ Casos de Error y Validaciones

## Recurso inexistente

### Obtener un videojuego que no existe

```bash
curl -X GET $API_URL/videojuegos/99999
```

Respuesta esperada:

```json
{
  "success": false,
  "error": "El juego no existe en la base de datos local ni en la API RAWG."
}
```

Código esperado:

```txt
404 Not Found
```

---

## Crear videojuego sin título

```bash
curl -X POST $API_URL/videojuegos \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "juego-prueba"
  }'
```

Código esperado:

```txt
400 Bad Request
```

---

## Crear videojuego con calificación inválida

```bash
curl -X POST $API_URL/videojuegos \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Juego Test",
    "slug": "juego-test",
    "calificacion_global": 10
  }'
```

Código esperado:

```txt
400 Bad Request
```

---

## Crear videojuego duplicado

```bash
curl -X POST $API_URL/videojuegos \
  -H "Content-Type: application/json" \
  -d '{
    "id_rawg": 124562,
    "titulo": "Elden Ring",
    "slug": "elden-ring"
  }'
```

Código esperado:

```txt
409 Conflict
```

---

## Agregar dos veces el mismo videojuego a la colección

```bash
curl -X POST $API_URL/colecciones \
  -H "Content-Type: application/json" \
  -d '{
    "id_usuario": 1,
    "id_juego": 1
  }'
```

Respuesta esperada:

```json
{
  "success": false,
  "error": "Este juego ya figura en tu colección."
}
```

Código esperado:

```txt
409 Conflict
```

---

## Actualizar videojuego inexistente en la colección

```bash
curl -X PUT $API_URL/colecciones/99999 \
  -H "Content-Type: application/json" \
  -d '{
    "id_usuario": 1,
    "estado": "jugando"
  }'
```

Código esperado:

```txt
404 Not Found
```

---

## Ruta inexistente

```bash
curl -X GET $API_URL/ruta-inexistente
```

Respuesta esperada:

```json
{
  "error": "Route not found"
}
```

Código esperado:

```txt
404 Not Found
```

---

# 📋 Resumen General de Endpoints

| Método | Endpoint | Descripción |
|----------|----------|-------------|
| GET | `/health` | Health check general del servidor |
| GET | `/api/health` | Health check de la API |
| GET | `/api/test` | Endpoint de prueba |
| GET | `/api/plataformas` | Obtener todas las plataformas |
| GET | `/api/plataformas/:id` | Obtener plataforma por ID |
| POST | `/api/plataformas` | Crear plataforma |
| PUT | `/api/plataformas/:id` | Actualizar plataforma |
| DELETE | `/api/plataformas/:id` | Eliminar plataforma |
| GET | `/api/generos` | Obtener todos los géneros |
| GET | `/api/generos/:id` | Obtener género por ID |
| POST | `/api/generos` | Crear género |
| PUT | `/api/generos/:id` | Actualizar género |
| DELETE | `/api/generos/:id` | Eliminar género |
| GET | `/api/videojuegos` | Obtener todos los videojuegos |
| GET | `/api/videojuegos/:id` | Obtener videojuego por ID |
| POST | `/api/videojuegos` | Crear videojuego |
| PUT | `/api/videojuegos/:id` | Actualizar videojuego |
| DELETE | `/api/videojuegos/:id` | Eliminar videojuego |
| GET | `/api/colecciones` | Obtener colección del usuario |
| POST | `/api/colecciones` | Agregar videojuego a la colección |
| PUT | `/api/colecciones/:id_juego` | Actualizar progreso de un videojuego |
| DELETE | `/api/colecciones/:id_juego` | Eliminar videojuego de la colección |
| GET | `/api/usuarios` | Obtener usuarios |
| PUT | `/api/usuarios/:id` | Actualizar usuario |
| DELETE | `/api/usuarios/:id` | Eliminar usuario |
| POST | `/api/auth/register` | Registrar usuario |
| POST | `/api/auth/login` | Iniciar sesión |
| GET | `/api/auth/perfil` | Obtener perfil del usuario |

---

# ✅ Estado Actual del Proyecto

Funcionalidades verificadas mediante pruebas manuales:

- Health checks operativos.
- CRUD de plataformas.
- CRUD de géneros.
- CRUD de videojuegos.
- Gestión de colección de videojuegos.
- CRUD básico de usuarios.
- Conexión con PostgreSQL mediante Sequelize.
- Backend desplegado mediante Docker Compose.
- Integración preliminar con RAWG.

Funcionalidades en desarrollo:

- Implementación completa de autenticación JWT.
- Seeders dependientes de RAWG API.
- Testing automatizado con Jest.
- Despliegue final en Render.