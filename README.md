# Club Gamer - Trabajo Final de Programación III

## 🎮 ¿Qué es Club Gamer?

Club Gamer es una aplicación web full-stack diseñada para la gestión y seguimiento de colecciones personales de videojuegos. El objetivo principal del sistema es brindar a los jugadores una plataforma moderna e intuitiva para explorar un extenso catálogo de juegos, organizar sus títulos en colecciones personalizadas y registrar información detallada sobre su progreso y experiencia de juego.

A través del sistema, cada usuario puede clasificar sus títulos por estado (pendiente, jugando, completado), plataforma y género, además de añadir valoraciones personales, horas jugadas y reseñas.

El proyecto fue desarrollado como Trabajo Final integrador para la cátedra de **Programación III** en la **UTN FRBB**. Se trata de una solución full-stack compuesta por un **Frontend interactivo en React** (con Vite y Tailwind CSS), un **Backend RESTful en Node.js con Express**, una base de datos **PostgreSQL** administrada mediante **Sequelize ORM**, integración con la **API de RAWG** para la carga automática de catálogo, y un entorno completamente contenerizado mediante **Docker Compose**.

## ✨ Características Principales

- **Interfaz Web Interactiva:** Desarrollada en React con Vite, Tailwind CSS y diseño responsive.
- **Autenticación y Seguridad:** Registro e inicio de sesión de usuarios con encriptación (`bcrypt`), tokens `JWT` e interceptores en el frontend.
- **Catálogo General de Videojuegos:** Integración con la API externa de RAWG para consulta, autocompletado y sincronización de datos.
- **Colección Personal por Usuario:** Alta, modificación y eliminación de juegos en colecciones personalizadas.
- **Seguimiento de Progreso:** Registro de estado (pendiente, jugando, completado), valoración personal y horas jugadas.
- **Búsqueda Avanzada y Paginación:** Filtros por título, plataforma, género y año de lanzamiento.
- **API RESTful:** Backend estructurado en Node.js y Express mediante arquitectura MVC.
- **Base de Datos Relacional:** PostgreSQL administrada con Sequelize ORM (modelos, migraciones, seeders y relaciones muchos a muchos).
- **Entorno Contenerizado:** Despliegue y orquestación con Docker Compose (Frontend, Backend, PostgreSQL, Redis, Caddy y pgAdmin).

## 🧩 Etapas

El desarrollo del proyecto se estructuró en dos entregas principales:

### 🔹 Primera Etapa: Backend y Base de Datos
Centrada en la construcción de la arquitectura base del servidor y la API REST:
- Modelado de entidades relacionales con Sequelize ORM.
- Creación de migraciones y seeders para datos iniciales.
- Desarrollo de controladores, rutas REST y validaciones de entrada.
- Implementación de CRUDs para Videojuegos, Géneros, Plataformas y Colecciones.
- Pruebas manuales y documentación de la API con Postman (`API_test.md`).

### 🔹 Segunda Etapa: Frontend e Integración Full-Stack
Centrada en la interfaz gráfica de usuario y la integración completa del sistema:
- Desarrollo de la aplicación web interactiva en React (con Vite y Tailwind CSS).
- Implementación de autenticación de usuarios (Registro/Login), manejo de sesión y rutas protegidas.
- Conexión del Frontend con la API REST del Backend mediante Axios e interceptores.
- Integración completa con la API externa de RAWG.
- Contenerización y orquestación del entorno full-stack con Docker Compose.

## 👥 Integrantes - Grupo 19

- [@fedeheinrich](https://github.com/fedeheinrich) - Federico Heinrich
- [@Oviedo-Matias](https://github.com/Oviedo-Matias) - Matias Oviedo
- [@Tincho2319](https://github.com/Tincho2319) - Martin Alcaraz
- [@Nahuelete](https://github.com/Nahuelete) - Nahuel Cappa
- [@nicc-essp](https://github.com/nicc-essp) - Nicolas Espulef
- [@HomeroColomboArg](https://github.com/HomeroColomboArg) - Homero Colombo

## 🛠️ Metodología de Trabajo

Para mantener el repositorio organizado entre los seis, utilizamos la estrategia de ramificación **Git Flow** y los **estandares de contribución** detallados más abajo.

### Estrategia de Ramificación Git Flow

- main: Código en su version estable y completa (V1.0).

- release/x.0 : Preparacion de una nueva version. Se crea cuando develop tiene suficientes funcionalidades para una entrega, sirve para corregir errores menores durante la revision, ajustar numeros de version, actualizar documentacion y **IMPORTANTE: no agregar funcionalidades nuevas**.
  > \*Se crea desde **develop\***, y una vez que se completa el trabajo en dicha rama (obtenemos la version estable) se realiza el merge a develop y a main para actualizar el codigo en ambas ramas.
- develop: rama de desarrollo.

- feature/nombre-de-la-funcionalidad: Para crear nuevas funcionalidades.

  > \*Se crea desde **develop\*** para trabajar en una nueva funcion a implementar. Una vez completada la funcionalidad, se hace el merge a develop y se elimina la rama.

- hotfix: Correcion urgente de un error que se encuentra en main.
  > Cuando encontramos un error importante en la version estable, \*se crea desde **main\*** para trabajar en la correcion del error y solucionarlo lo antes posible. Una vez corregido el bug, se hace el merge a main y a develop.

### Estandares de contribución

- **Commits**: Utilizar titulos descriptivos con el formato `tipo: descripción`.

  > Ejemplo: `feat: implementación de login` o `fix: corrección de ruta API`.

- **Revisiones de Pull Requests (PR)**: Al menos un compañero de equipo debe revisar una solicitud de incorporacion de cambios antes de fusionarla (merge) con develop.

## 📂 Estructura del Proyecto

```text
clubgamer/
│
├── .gitignore
├── API_test.md                          # Guía de pruebas y ejemplos de uso de la API.
├── docker-compose.yml                   # Orquestación de servicios Docker.
├── LICENSE                              # Licencia del proyecto.
├── rd.md
├── README.md                            # Documentación principal del proyecto.
│
├── backend/
│   ├── .env.example                     # Plantilla de variables de entorno.
│   ├── Dockerfile                       # Imagen Docker para producción.
│   ├── Dockerfile.dev                   # Imagen Docker para desarrollo.
│   ├── package.json                     # Dependencias y scripts del backend.
│   ├── server.js                        # Punto de entrada del servidor Express.
│   │
│   ├── config/
│   │   ├── config.js                    # Configuración general de Sequelize.
│   │   └── database.js                  # Configuración de conexión a PostgreSQL.
│   │
│   ├── controllers/                     # Lógica de negocio de la API.
│   │   ├── authController.js
│   │   ├── coleccionController.js
│   │   ├── generoController.js
│   │   ├── plataformasController.js
│   │   ├── userController.js
│   │   └── videojuegosController.js
│   │
│   ├── middleware/                      # Middlewares de autenticación y validaciones.
│   │   └── auth.js
│   │
│   ├── migrations/                      # Migraciones de la base de datos.
│   │   ├── 01-User.js
│   │   ├── 02-Plataforma.js
│   │   ├── 03-Genero.js
│   │   ├── 04-Juego.js
│   │   ├── 05-JuegoUser.js
│   │   ├── 06-JuegoGenero.js
│   │   └── 07-JuegoPlataforma.js
│   │
│   ├── models/                          # Modelos Sequelize y relaciones.
│   │   ├── User.js
│   │   ├── Juego.js
│   │   ├── Genero.js
│   │   ├── Plataforma.js
│   │   ├── JuegoUser.js
│   │   ├── JuegoGenero.js
│   │   ├── JuegoPlataforma.js
│   │   └── index.js
│   │
│   ├── routes/                          # Definición de endpoints REST.
│   │   ├── auth.js
│   │   ├── colecciones.js
│   │   ├── generos.js
│   │   ├── index.js
│   │   ├── plataformas.js
│   │   ├── user.js
│   │   └── videojuegos.js
│   │
│   ├── seeders/                         # Datos iniciales para pruebas y desarrollo.
│   │   ├── 01-Users.js
│   │   ├── 02-Juegos.js
│   │   ├── 03-Generos.js
│   │   ├── 04-Plataformas.js
│   │   └── 05-JuegosUsers.js
│   │
│   ├── tests/                           # Pruebas automatizadas
│   │
│   └── utils/
│       └── rawgHelper.js                # Integración con la API RAWG.
│
├── frontend/
│   ├── Dockerfile                       # Imagen Docker para producción.
│   ├── Dockerfile.dev                   # Imagen Docker para desarrollo.
│   ├── eslint.config.cjs                # Configuración de ESLint.
│   ├── index.html                       # Plantilla HTML principal de Vite.
│   ├── package.json                     # Dependencias y scripts del frontend.
│   ├── postcss.config.js                # Configuración de PostCSS.
│   ├── tailwind.config.js               # Configuración de Tailwind CSS.
│   ├── vite.config.js                   # Configuración de Vite.
│   │
│   └── src/
│       ├── App.jsx
│       ├── App.css
│       ├── index.jsx
│       ├── index.css
│       │
│       ├── assets/
│       │   ├── icons/                   # Íconos del proyecto.
│       │   └── images/                  # Imágenes y recursos gráficos.
│       │       ├── coleccion1.png
│       │       ├── estrella1.png
│       │       ├── flecha-izquierda.png
│       │       ├── fondo 3.jpg
│       │       ├── icono.png
│       │       ├── logo.png
│       │       ├── logohorizontal.png
│       │       ├── lupa.png
│       │       └── diagrama_programacion3f_V3.drawio.png
│       │
│       ├── components/
│       │   ├── common/                  # Componentes reutilizables generales.
│       │   │   └── PlaceholderPage.jsx
│       │   ├── layout/                  # Componentes de estructura visual.
│       │   │   ├── Footer.css
│       │   │   ├── Footer.jsx
│       │   │   ├── Header.css
│       │   │   ├── Header.jsx
│       │   │   └── SidebarNavigation.jsx
│       │   └── ui/                      # Componentes de interfaz de usuario.
│       │       ├── CartelAgregarAColeccion.jsx
│       │       ├── CartelBase.jsx
│       │       ├── CartelCrearColeccion.jsx
│       │       ├── CartelEditarColeccion.jsx
│       │       └── Gamecard.jsx
│       │
│       ├── contexts/                    # Contexto global de React (Autenticación).
│       │   └── AuthContext.jsx
│       │
│       ├── hooks/                       # Hooks personalizados (useAuth).
│       │   └── useAuth.jsx
│       │
│       ├── pages/                       # Páginas principales de la aplicación.
│       │   ├── Bienvenida.jsx
│       │   ├── Colecciones.jsx
│       │   ├── Juegos.jsx
│       │   ├── Login.jsx
│       │   ├── NotFound.jsx
│       │   └── Registro.jsx
│       │
│       ├── services/                    # Servicios de comunicación con la API.
│       │   ├── axiosInterceptor.jsx
│       │   └── gameService.js
│       │
│       ├── styles/                      # Estilos globales.
│       │
│       └── utils/                       # Funciones auxiliares.
│
├── database/
│   └── init.sql                         # Script de inicialización de PostgreSQL.
│
├── pgadmin/
│   ├── Dockerfile                       # Imagen Docker de pgAdmin.
│   ├── pgpass                           # Credenciales de acceso a PostgreSQL.
│   ├── servers-with-password.json       # Configuración automática con contraseña.
│   └── servers.json                     # Configuración automática de servidores.
│
├── caddy/
│   └── Caddyfile                        # Configuración del proxy reverso Caddy.
```

## 🗂️ División de Archivos

A continuación, se detalla la responsabilidad de cada integrante sobre los principales módulos del repositorio:

| Responsable | Archivos y Carpetas Principales | Funcionalidad / Módulo |
| :--- | :--- | :--- |
| **Federico Heinrich** | `backend/controllers/` (`plataformas`, `generos`, `coleccion`), `backend/utils/rawgHelper.js`, `frontend/src/components/layout/` (`Header`, `Sidebar`), `frontend/src/components/ui/` (`Gamecard`, `Carteles`), `frontend/src/pages/` (`Juegos`, `Colecciones`) | Arquitectura base Frontend/Backend, CRUD de Plataformas, Géneros y Colecciones, integración con API RAWG (`rawgHelper`), componentes visuales modulares y pantallas de catálogo. |
| **Matías Oviedo** | `backend/models/*`, `backend/migrations/*`, `backend/seeders/*`, `frontend/src/pages/Login.jsx`, `frontend/src/pages/Registro.jsx`, `frontend/src/contexts/AuthContext.jsx`, `frontend/src/services/axiosInterceptor.jsx` | Modelado de datos (Sequelize), relaciones, migraciones y seeders. Frontend: Vistas de autenticación (Login/Registro), manejo del estado global de sesión (`AuthContext`) e interceptores Axios. |
| **Martín Alcaraz** | `backend/controllers/videojuegosController.js`, `backend/routes/videojuegos.js`, `frontend/src/pages/Bienvenida.jsx`, `frontend/src/services/gameService.js` | Gestión de la entidad principal de videojuegos en el backend. En Frontend: diseño interactivo e implementación de la Landing Page (Bienvenida) y llamadas al servicio de juegos. |
| **Nahuel Cappa** | `backend/middleware/*`, `backend/tests/*`, `API_test.md`, `frontend/src/assets/images/*` | Creación de Middlewares de validación para los CRUDs en el backend, diseño de pruebas manuales (`API_test.md`) y gestión de recursos gráficos e iconos del Frontend. |
| **Homero Colombo** | `README.md`, `API_test.md`, `postman_collection.json`, `backend/controllers/authController.js`, `backend/middleware/auth.js` | Autenticación y seguridad de rutas con JWT en Backend (`authController`, `authMiddleware`), documentación técnica general, y creación de la colección interactiva de Postman. |
| **Nicolás Espulef** | `docker-compose.yml`, `backend/Dockerfile`, `.env.example`, `backend/controllers/userController.js`, `frontend/src/components/layout/Footer.jsx` | Infraestructura, despliegue con Docker Compose (Backend, Postgres, pgAdmin), configuración de contenedores, CRUD de la entidad de usuarios (`userController`) y maquetación del `Footer`. |

## 🏗️ Arquitectura General

Club Gamer utiliza una arquitectura cliente-servidor compuesta por un frontend desarrollado en React, un backend basado en Express y una base de datos PostgreSQL administrada mediante Sequelize.

El backend expone una API REST encargada de procesar las solicitudes del cliente, aplicar la lógica de negocio y gestionar la persistencia de los datos. Por su parte, el frontend consume los endpoints de la API para mostrar y modificar la información de la colección de videojuegos.

Adicionalmente, el sistema incorpora integración con la API pública de RAWG para obtener información actualizada de videojuegos cuando estos no se encuentran almacenados localmente en la base de datos.

```text
Usuario
   │
   ▼
Frontend (React)
   │
   ▼
Backend (Express)
   │
   ├── PostgreSQL
   │
   └── API RAWG
```

## 🛠️ Tecnologías Utilizadas

### Backend

- Node.js
- Express
- Sequelize
- PostgreSQL
- JWT
- bcryptjs
- express-validator
- cors
- helmet
- dotenv
- morgan

### Frontend

- React
- Vite
- Axios
- React Router
- Tailwind CSS
- ESLint
- Prettier

### Infraestructura

- Docker
- Docker Compose
- pgAdmin
- Redis

### Testing y Documentación

- Postman
- Jest
- Supertest

## 🚀 Instalación y Ejecución

### Requisitos previos

Para ejecutar el proyecto de forma local es necesario contar con:

- Git
- Docker
- Docker Compose
- Node.js, en caso de ejecutar servicios fuera de Docker
- Una API Key de RAWG

### Clonar el repositorio

```bash
git clone https://github.com/fedeheinrich/clubgamer.git
cd clubgamer
```

### Cambiar a la rama de desarrollo

```bash
git checkout develop
```

### Configurar variables de entorno

Antes de levantar el backend, se debe crear un archivo `.env` dentro de la carpeta `backend/`.

Se recomienda tomar como referencia el archivo:

```txt
backend/.env.example
```

### Levantar los servicios con Docker

Desde la raíz del proyecto:

```bash
docker compose build
docker compose up -d
```

### Acceso a los Servicios

Una vez que los contenedores estén corriendo, puedes acceder a los siguientes servicios desde tu navegador:

| Servicio | URL de Acceso | Descripción |
| :--- | :--- | :--- |
| **Frontend (React)** | `http://localhost:3000` | Interfaz web de usuario |
| **Backend (API REST)** | `http://localhost:3001/api` | Servidor de la API |
| **pgAdmin 4** | `http://localhost:5050` | Administrador visual de PostgreSQL |

### Verificar que el backend funciona

Se puede verificar el estado de la API accediendo a:

```txt
http://localhost:3001/api/health
```

Respuesta esperada:

```json
{
  "status": "OK",
  "message": "API funcionando correctamente",
  "timestamp": "2024-XX-XXTXX:XX:XX.XXXZ",
  "environment": "development"
}
```

### Detener los servicios

```bash
docker compose down
```

Para detener los servicios y eliminar los volúmenes de la base de datos:

```bash
docker compose down -v
```

## ⚙️ Configuración del Entorno

El backend utiliza variables de entorno para definir la configuración del servidor, la conexión a la base de datos, la integración con RAWG y valores necesarios para autenticación.

El archivo `.env` debe crearse dentro de la carpeta `backend/` y no debe subirse al repositorio.

### Variables disponibles

| Variable     | Descripción                                 |
| ------------ | ------------------------------------------- |
| PORT         | Puerto utilizado por el servidor Express.   |
| NODE_ENV     | Entorno de ejecución de la aplicación.      |
| DB_HOST      | Host de la base de datos PostgreSQL.        |
| DB_PORT      | Puerto de PostgreSQL.                       |
| DB_NAME      | Nombre de la base de datos.                 |
| DB_USER      | Usuario de PostgreSQL.                      |
| DB_PASSWORD  | Contraseña del usuario de PostgreSQL.       |
| RAWG_API_KEY | Clave de acceso a la API RAWG.              |
| JWT_SECRET   | Clave utilizada para la autenticación JWT.  |
| CORS_ORIGIN  | Origen permitido para las solicitudes CORS. |

### Ejemplo de archivo `.env`

```env
PORT=3001
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=app_database
DB_USER=app_user
DB_PASSWORD=app_password

RAWG_API_KEY=ACA_PONES_TU_CLAVE_DE_RAWG

JWT_SECRET=secreto_jwt_clubgamer_2024
CORS_ORIGIN=http://localhost:3000
```

> Los archivos `.env` se encuentran excluidos del control de versiones mediante `.gitignore`, ya que contienen credenciales y claves privadas.
> 
> En el Frontend (`frontend/`), si se ejecuta fuera de Docker, se puede configurar opcionalmente un archivo `.env` con la variable `VITE_API_URL=http://localhost:3001/api`.

## 🗄️ Base de Datos

La base de datos utiliza PostgreSQL como sistema gestor y Sequelize como ORM principal.

El sistema se encuentra modelado mediante entidades relacionales que representan videojuegos, usuarios, géneros, plataformas y las relaciones entre ellos.

<img width="1257" height="782" alt="Diagrama entidad-relacion" src="./frontend/src/assets/images/diagrama_programacion3f_V3.drawio.png" />

### Entidades Principales

| Entidad         | Descripción                              |
| --------------- | ---------------------------------------- |
| User            | Usuarios registrados en la aplicación    |
| Juego           | Catálogo general de videojuegos          |
| Genero          | Géneros asociados a los videojuegos      |
| Plataforma      | Plataformas disponibles                  |
| JuegoUser       | Relación entre usuarios y videojuegos    |
| JuegoGenero     | Relación entre videojuegos y géneros     |
| JuegoPlataforma | Relación entre videojuegos y plataformas |

### Relaciones

- Un videojuego puede pertenecer a múltiples géneros.
- Un género puede estar asociado a múltiples videojuegos.
- Un videojuego puede estar disponible en múltiples plataformas.
- Una plataforma puede contener múltiples videojuegos.
- Un usuario puede registrar múltiples videojuegos en su colección.
- Un videojuego puede formar parte de la colección de múltiples usuarios.

## Endpoints y Documentación en Postman

[![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)](https://documenter.getpostman.com/view/50343050/2sBXwvK94A)

## 📡 API REST

La aplicación expone una API REST desarrollada con Express para administrar los recursos principales del sistema.

### Endpoints del Sistema

| Método | Endpoint    | Descripción                     |
| ------ | ----------- | ------------------------------- |
| GET    | /api/health | Verifica el estado del servidor |
| GET    | /api/test   | Endpoint de prueba              |

### Endpoints de Plataformas

| Método | Endpoint             |
| ------ | -------------------- |
| GET    | /api/plataformas     |
| GET    | /api/plataformas/:id |
| POST   | /api/plataformas     |
| PUT    | /api/plataformas/:id |
| DELETE | /api/plataformas/:id |

### Endpoints de Géneros

| Método | Endpoint         |
| ------ | ---------------- |
| GET    | /api/generos     |
| GET    | /api/generos/:id |
| POST   | /api/generos     |
| PUT    | /api/generos/:id |
| DELETE | /api/generos/:id |

### Endpoints de Videojuegos

| Método | Endpoint             |
| ------ | -------------------- |
| GET    | /api/videojuegos     |
| GET    | /api/videojuegos/:id |
| POST   | /api/videojuegos     |
| PUT    | /api/videojuegos/:id |
| DELETE | /api/videojuegos/:id |

### Endpoints de Colecciones

| Método | Endpoint                   |
| ------ | -------------------------- |
| GET    | /api/colecciones           |
| POST   | /api/colecciones           |
| PUT    | /api/colecciones/:id_juego |
| DELETE | /api/colecciones/:id_juego |

### Endpoints de Usuarios

| Método | Endpoint       | Descripción                        |
| ------ | -------------- | ---------------------------------- |
| GET    | /api/user      | Obtener todos los usuarios         |
| GET    | /api/user/:id  | Obtener usuario por ID             |
| POST   | /api/user      | Crear nuevo usuario                |
| PUT    | /api/user/:id  | Actualizar datos de usuario        |
| DELETE | /api/user/:id  | Eliminar usuario                   |

### Endpoints de Autenticación

| Método | Endpoint           |
| ------ | ------------------ |
| POST   | /api/auth/register |
| POST   | /api/auth/login    |
| GET    | /api/auth/perfil   |

## 🔗 Integración con RAWG

Club Gamer utiliza la API pública de RAWG como fuente de información de videojuegos.

Cuando un videojuego es solicitado por el sistema:

1. Se busca primero en la base de datos local.
2. Si existe, se devuelve inmediatamente.
3. Si no existe, se consulta la API de RAWG.
4. La información obtenida se almacena en PostgreSQL.
5. El resultado es devuelto al cliente.

Este mecanismo reduce consultas externas y permite construir progresivamente un catálogo local de videojuegos.

## 📚 Documentación

- 📖 [README.md](README.md) — Documentación principal del proyecto.
- 🧪 [API_test.md](API_test.md) — Casos de prueba y ejemplos de uso de la API.
- 📜 [LICENSE](LICENSE) — Licencia del proyecto.
- 📮 [Documentación Postman](https://documenter.getpostman.com/view/50343050/2sBXwvK94A) — Colección y documentación interactiva de endpoints.

Las pruebas manuales de la API pueden realizarse mediante Postman o utilizando los ejemplos documentados en API_test.md.
