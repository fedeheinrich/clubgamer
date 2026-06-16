# Club Gamer - Proyecto Segundo Parcial
## Materia: Programación III - Primer Cuatrimestre, 2do año 📚

## 🎮 ¿Qué es Club Gamer?

Club Gamer es una aplicación web full-stack desarrollada para gestionar una colección personal de videojuegos. El objetivo principal del sistema es permitir que un usuario pueda consultar un catálogo de juegos, agregar títulos a su propia colección y registrar información relacionada con su progreso dentro de cada juego.

La aplicación está pensada como una herramienta de organización para jugadores, tomando como referencia plataformas modernas de seguimiento de videojuegos. A través del sistema, cada usuario podrá clasificar sus juegos según estado, plataforma y género, además de registrar datos personales como calificación y cantidad de horas jugadas.

El proyecto fue desarrollado como trabajo práctico para la cátedra de Programación III en la UTN FRBB. En esta segunda entrega se trabaja sobre una arquitectura full-stack compuesta por un frontend en React, un backend en Node.js con Express, una base de datos PostgreSQL administrada mediante Sequelize y un entorno de ejecución basado en Docker Compose.

Durante la primera etapa del desarrollo, el foco está puesto principalmente en el backend y la base de datos. Por este motivo, se prioriza la creación de modelos, migraciones, seeders, rutas REST, controladores, validaciones, documentación técnica y pruebas manuales de la API.

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

* main: Código en su version estable y completa (V1.0).

* release/x.0 : Preparacion de una nueva version. Se crea cuando develop tiene suficientes funcionalidades para una entrega, sirve para corregir errores menores durante la revision, ajustar numeros de version, actualizar documentacion y **IMPORTANTE: no agregar funcionalidades nuevas**.
    > *Se crea desde **develop***, y una vez que se completa el trabajo en dicha rama (obtenemos la version estable) se realiza el merge a develop y a main para actualizar el codigo en ambas ramas.
* develop: rama de desarrollo.

* feature/nombre-de-la-funcionalidad: Para crear nuevas funcionalidades. 
    > *Se crea desde **develop*** para trabajar en una nueva funcion a implementar. Una vez completada la funcionalidad, se hace el merge a develop y se elimina la rama.

* hotfix: Correcion urgente de un error que se encuentra en main.
    > Cuando encontramos un error importante en la version estable, *se crea desde **main*** para trabajar en la correcion del error y solucionarlo lo antes posible. Una vez corregido el bug, se hace el merge a main y a develop.

### Estandares de contribución

- **Commits**: Utilizar titulos descriptivos con el formato `tipo: descripción`. 
    > Ejemplo: `feat: implementación de login` o `fix: corrección de ruta API`.

- **Revisiones de Pull Requests (PR)**: Al menos un compañero de equipo debe revisar una solicitud de incorporacion de cambios antes de fusionarla (merge) con develop.

## 📂 Estructura del Proyecto

    clubgamer/
    │
    ├── backend/
    │   │── server.js                          # Punto de entrada del servidor Express.
    │   │── package.json                       # Dependencias y scripts del backend.
    │   │── Dockerfile
    │   │── Dockerfile.dev
    │   │
    │   ├── config/
    │   │   ├── config.js                      # Configuración general del proyecto.
    │   │   └── database.js                    # Configuración de conexión a PostgreSQL.
    │   │
    │   ├── controllers/                       # Lógica de negocio de la API.
    │   │   ├── authController.js
    │   │   ├── coleccionController.js
    │   │   ├── generoController.js
    │   │   ├── plataformasController.js
    │   │   └── videojuegosController.js
    │   │
    │   ├── middleware/                        # Middlewares de autenticación y validaciones.
    │   │   └── auth.js
    │   │
    │   ├── models/                            # Modelos Sequelize y relaciones.
    │   │   ├── User.js
    │   │   ├── Juego.js
    │   │   ├── Genero.js
    │   │   ├── Plataforma.js
    │   │   ├── JuegoUser.js
    │   │   ├── JuegoGenero.js
    │   │   ├── JuegoPlataforma.js
    │   │   └── index.js
    │   │
    │   ├── migrations/                        # Migraciones de la base de datos.
    │   │   ├── User.js
    │   │   ├── Juego.js
    │   │   ├── Genero.js
    │   │   ├── Plataforma.js
    │   │   ├── JuegoUser.js
    │   │   ├── JuegoGenero.js
    │   │   └── JuegoPlataforma.js
    │   │
    │   ├── seeders/                           # Datos iniciales de prueba.
    │   │
    │   ├── routes/                            # Definición de endpoints REST.
    │   │   ├── auth.js
    │   │   ├── colecciones.js
    │   │   ├── generos.js
    │   │   ├── plataformas.js
    │   │   ├── videojuegos.js
    │   │   └── index.js
    │   │
    │   ├── tests/                             # Testing automatizado.
    │   │
    │   └── utils/
    │       └── rawgHelper.js                  # Integración con la API RAWG.
    │
    ├── frontend/
    │   ├── public/
    │   └── src/
    │       ├── assets/
    │       │   ├── icons/
    │       │   └── images/
    │       ├── components/
    │       │   ├── common/
    │       │   ├── layout/
    │       │   └── ui/
    │       ├── hooks/
    │       ├── pages/
    │       ├── services/
    │       ├── styles/
    │       └── utils/
    │
    ├── database/                              # Configuración y persistencia de PostgreSQL.
    │
    ├── pgadmin/                               # Administración visual de la base de datos.
    │
    ├── caddy/                                 # Configuración de proxy y servidor web.
    │
    ├── docker-compose.yml                     # Orquestación de servicios.
    │
    └── README.md                              # Documentación general del proyecto.
    
## 🗂️ División de Archivos

A continuación, se detalla la responsabilidad de cada integrante sobre los principales módulos del repositorio:

| Responsable | Archivos y Carpetas Principales | Funcionalidad / Módulo |
| :--- | :--- | :--- |
| **Federico Heinrich** | `backend/controllers/plataformasController.js`, `backend/routes/plataformas.js`, `backend/routes/index.js` | Configuración inicial del repositorio, arquitectura base del backend y gestión de plataformas (CRUD y endpoints). |
| **Matías Oviedo** | `backend/models/*`, `backend/migrations/*`, `backend/seeders/*` | Modelado de datos, relaciones Sequelize, migraciones, seeders e integración de la estructura de almacenamiento para RAWG. |
| **Martín Alcaraz** | `backend/controllers/videojuegosController.js`, `backend/controllers/coleccionController.js`, `backend/routes/videojuegos.js`, `backend/routes/colecciones.js`, `backend/utils/rawgHelper.js` | Gestión de videojuegos, colecciones de usuario, integración con PostgreSQL e intermediario con la API RAWG. |
| **Nahuel Cappa** | `backend/tests/*`, `API_test.md`, `backend/middleware/*` | Validaciones de entrada, testing manual y documentación de pruebas de la API. |
| **Homero Colombo** | `README.md`, `postman_collection.json`, documentación de Postman y scripts de pruebas automatizadas | Documentación técnica del proyecto, colección Postman y testing automatizado. |
| **Nicolás Espulef** | `docker-compose.yml`, `.env.example`, configuración de Render y despliegue | Infraestructura, despliegue del backend y base de datos, configuración de entornos y variables de entorno. |

## ✨ Características Principales

- Catálogo general de videojuegos.
- Alta, consulta y modificación de videojuegos.
- Gestión de plataformas disponibles.
- Gestión de géneros asociados a los videojuegos.
- Asociación de videojuegos con múltiples plataformas.
- Asociación de videojuegos con múltiples géneros.
- Colección personal de videojuegos por usuario.
- Registro del estado de cada videojuego dentro de la colección.
- Estados posibles: pendiente, jugando o completado.
- Registro de calificación personal.
- Registro de horas jugadas.
- Filtros de búsqueda por título, plataforma, género y año.
- Paginación de resultados.
- API REST desarrollada con Express.
- Base de datos relacional con PostgreSQL.
- Modelado de datos mediante Sequelize.
- Entorno de desarrollo contenerizado con Docker Compose.
- Administración visual de base de datos mediante pgAdmin.
- Documentación de endpoints mediante Postman.
- Pruebas manuales documentadas en `API_test.md`.

## 🧩 Alcance de la Primera Etapa

La primera etapa del proyecto se centra en el desarrollo del backend y la base de datos. El objetivo es dejar preparada una API REST funcional que permita administrar las entidades principales del sistema y probarlas de forma manual mediante Postman o comandos curl.

Para esta entrega se trabaja sobre las siguientes áreas:

- Modelado de entidades con Sequelize.
- Creación de migraciones y seeders.
- Desarrollo de controladores y rutas para la API.
- CRUD de plataformas.
- CRUD de géneros.
- CRUD de videojuegos.
- Gestión de la colección personal del usuario.
- Validaciones de entrada.
- Manejo básico de errores HTTP.
- Documentación técnica del proyecto.
- Documentación de pruebas manuales de la API.

Algunas funcionalidades, como autenticación JWT completa, integración definitiva con RAWG, frontend completo y testing automatizado con Jest, quedan previstas para etapas posteriores del desarrollo.

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
- Axios
- React Router

### Infraestructura

- Docker
- Docker Compose
- pgAdmin
- Redis

### Testing y Documentación

- Postman
- Jest
- Supertest

## 🗄️ Base de Datos

La base de datos utiliza PostgreSQL como sistema gestor y Sequelize como ORM principal.

El sistema se encuentra modelado mediante entidades relacionales que representan videojuegos, usuarios, géneros, plataformas y las relaciones entre ellos.

### Entidades Principales

| Entidad | Descripción |
|----------|----------|
| User | Usuarios registrados en la aplicación |
| Juego | Catálogo general de videojuegos |
| Genero | Géneros asociados a los videojuegos |
| Plataforma | Plataformas disponibles |
| JuegoUser | Relación entre usuarios y videojuegos |
| JuegoGenero | Relación entre videojuegos y géneros |
| JuegoPlataforma | Relación entre videojuegos y plataformas |

### Relaciones

- Un videojuego puede pertenecer a múltiples géneros.
- Un género puede estar asociado a múltiples videojuegos.
- Un videojuego puede estar disponible en múltiples plataformas.
- Una plataforma puede contener múltiples videojuegos.
- Un usuario puede registrar múltiples videojuegos en su colección.
- Un videojuego puede formar parte de la colección de múltiples usuarios.

## 📡 API REST

La aplicación expone una API REST desarrollada con Express para administrar los recursos principales del sistema.

### Endpoints del Sistema

| Método | Endpoint | Descripción |
|----------|----------|----------|
| GET | /api/health | Verifica el estado del servidor |
| GET | /api/test | Endpoint de prueba |

### Endpoints de Plataformas

| Método | Endpoint |
|----------|----------|
| GET | /api/plataformas |
| GET | /api/plataformas/:id |
| POST | /api/plataformas |
| PUT | /api/plataformas/:id |
| DELETE | /api/plataformas/:id |

### Endpoints de Géneros

| Método | Endpoint |
|----------|----------|
| GET | /api/generos |
| GET | /api/generos/:id |
| POST | /api/generos |
| PUT | /api/generos/:id |
| DELETE | /api/generos/:id |

### Endpoints de Videojuegos

| Método | Endpoint |
|----------|----------|
| GET | /api/videojuegos |
| GET | /api/videojuegos/:id |
| POST | /api/videojuegos |
| PUT | /api/videojuegos/:id |
| DELETE | /api/videojuegos/:id |

### Endpoints de Colecciones

| Método | Endpoint |
|----------|----------|
| GET | /api/colecciones |
| POST | /api/colecciones |
| PUT | /api/colecciones/:id_juego |
| DELETE | /api/colecciones/:id_juego |

