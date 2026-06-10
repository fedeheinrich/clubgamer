# 🎮 División de Tareas - Etapa 1

## Entrega: Lunes 17 de Junio - 23:59hs

> ⚠️ **IMPORTANTE:** Lo que está acá solamente es OBLIGATORIO para el 17 de junio.

---

## 👥 Distribución de Tareas

### 👤 MATÍAS - Base de Datos

**Deadline:** Viernes 14 de Junio (para que otros empiecen)

- [ ] Crear modelos Sequelize: User, Videojuego, Plataforma, Género
- [ ] Definir relaciones (many-to-many con tablas intermedias)
- [ ] Crear migraciones y ejecutarlas
- [ ] Crear seeders con ~15-20 videojuegos reales
- [ ] Verificar que `docker-compose up` levanta la BD sin errores

**Archivos:** `backend/models/User.js`, `backend/models/Videojuego.js`, etc.

---

### 🔗 MARTÍN - API REST Videojuegos + Mi Colección

**Deadline:** Lunes 17 de Junio

**Endpoints GET (lectura):**

- [ ] `GET /api/videojuegos` (con paginación: ?pagina=1&limite=10)
- [ ] `GET /api/videojuegos/:id`
- [ ] `GET /api/mi-coleccion` (mis juegos)

**Endpoints POST/PUT/DELETE:**

- [ ] `POST /api/videojuegos` (crear)
- [ ] `PUT /api/videojuegos/:id` (actualizar)
- [ ] `POST /api/mi-coleccion/:id` (agregar a colección)
- [ ] `PUT /api/mi-coleccion/:id` (actualizar estado/calificación/horas)
- [ ] `DELETE /api/mi-coleccion/:id` (eliminar de colección)

**Búsqueda y filtros:**

- [ ] `?busqueda=elden` (por título)
- [ ] `?plataforma=1` (por plataforma)
- [ ] `?genero=1` (por género)
- [ ] `?año=2024` (por año)

**Validaciones:**

- [ ] Códigos HTTP correctos (200, 201, 400, 404)
- [ ] Manejo de errores básico

**Archivos:** `backend/controllers/videojuegoController.js`, `backend/routes/videojuegos.js`

---

### 🎮 FEDERICO - API REST Plataformas + Middleware Global

**Deadline:** Lunes 17 de Junio

- [x] **Creacion del Repositorio en Github siguiendo metodologia Git Flow**

**API Plataformas CRUD:**

- [x] `GET /api/plataformas`
- [x] `GET /api/plataformas/:id`
- [x] `POST /api/plataformas` (crear)
- [x] `PUT /api/plataformas/:id` (actualizar)
- [x] `DELETE /api/plataformas/:id` (eliminar)

**Middleware de respuestas unificadas:**

- [ ] Crear `backend/middleware/responseFormatter.js`
- [ ] Formato éxito: `{ success: true, statusCode, message, data, timestamp }`
- [ ] Formato error: `{ success: false, statusCode, message, error, timestamp }`
- [ ] Aplicar a TODOS los endpoints

**Archivos:** `backend/controllers/plataformaController.js`, `backend/routes/plataformas.js`, `backend/middleware/responseFormatter.js`

---

### ✔️ NAHUEL - Validaciones + Testing Manual

**Deadline:** Lunes 17 de Junio

**Middleware de validaciones:**

- [ ] Crear `backend/middleware/validations.js`
- [ ] Validar Videojuego: titulo (min 3), año (1970-2030), plataformas[], generos[]
- [ ] Validar Plataforma: nombre (min 2, único), logo_url (URL válida)
- [ ] Validar UserVideojuego: estado (enum: pendiente|jugando|completado), calificacion (1-10), horasJugadas (número)
- [ ] Aplicar validaciones en rutas POST/PUT

**Testing manual:**

- [ ] Actualizar `API_test.md` con ejemplos curl/Postman de TODOS los endpoints
- [ ] Incluir casos de éxito y error
- [ ] Crear colección Postman `.json` y exportarla
- [ ] Probar manualmente cada endpoint

**Archivos:** `API_test.md`, `postman_collection.json`

---

### 🐳 NICOLÁS - DevOps y Docker

**Deadline:** Lunes 17 de Junio

**Verificaciones locales:**

- [ ] `docker-compose build` construye sin errores
- [ ] `docker-compose up` levanta los 6 servicios sin errores
- [ ] Backend conecta a PostgreSQL correctamente
- [ ] Migraciones se ejecutan automáticamente
- [ ] Seeders cargan datos automáticamente
- [ ] Hot reload funciona (cambios en código = server reinicia)

**Variables de entorno:**

- [ ] Crear `.env` en `backend/` con todas las variables necesarias
- [ ] Verificar que `.env` está en `.gitignore`
- [ ] Documentar las variables en README

**Testing desde cero:**

- [ ] `docker-compose down -v` (borrar todo)
- [ ] `docker-compose build --no-cache`
- [ ] `docker-compose up` (¿funciona sin errores?)

---

### 📚 HOMERO - Documentación

**Deadline:** Lunes 17 de Junio

**README.md:**

- [ ] Inicio rápido (docker-compose up)
- [ ] Estructura de base de datos (tabla de entidades)
- [ ] Lista de endpoints disponibles
- [ ] Credenciales de BD
- [ ] Cómo importar Postman

**API_test.md:**

- [ ] Ejemplos curl/JSON para cada endpoint
- [ ] Casos de éxito (200, 201)
- [ ] Casos de error (400, 404)

**Postman:**

- [ ] Colección con todos los endpoints
- [ ] Variables: `{{base_url}}` = http://localhost:3001
- [ ] Tests simples (verificar status code)
- [ ] Exportar como `.json`

---

## 🔄 Dependencias (en este orden)

```
1. MATÍAS (BD) — Viernes 14
        ↓
2. MARTÍN + FEDERICO (APIs) — Fin de semana 15-16
        ↓
3. NAHUEL (Validaciones + Testing) — Domingo 16
        ↓
4. HOMERO (Documentación) — Lunes 17 (mañana)
        ↓
5. NICOLÁS (Verifica todo funciona) — Lunes 17 (tarde)
        ↓
6. ENTREGA ✅ — Lunes 17 16:00hs
```

---

## ✅ Checklist Final

Antes de hacer el último push:

- [ ] BD: Todas las tablas, migraciones, seeders OK
- [ ] Backend: `docker-compose up` funciona sin errores
- [ ] Todos los endpoints listados arriba funcionan
- [ ] Validaciones funcionan
- [ ] Códigos HTTP correctos
- [ ] API_test.md completo
- [ ] Postman collection funciona
- [ ] README.md actualizado
- [ ] Variables .env documentadas
- [ ] Último commit: `Entrega Etapa 1 - 17 Junio`
- [ ] Tag: `v1.0-etapa1`

---

## 🚨 Lo que NO hacemos para el 17

| ❌               | Por qué                 |
| ---------------- | ----------------------- |
| JWT (8 TODOs)    | Es para el 8/7          |
| RAWG integration | Optativo, puede esperar |
| Redis            | Es para el 8/7          |
| Jest             | Es para después         |
| Frontend         | Es para el 8/7          |

---

## 📋 Reglas de Equipo

- **Sin push a `main` ni `develop`** — Solo PRs con review
- **Rama feature/** — `git checkout -b feature/tu-tarea`
- **Comunicación** — Si algo no funciona, avisa INMEDIATAMENTE
- **Si terminas rápido** — Ayuda a otros

---

**¡Vamos ClubGamer! 🎮**
