# Club Gamer - Proyecto Segundo Parcial
## Materia: Programación III - Primer Cuatrimestre, 2do año 📚

## 🎮 ¿Qué es Club Gamer?

Club Gamer es una aplicación web full-stack desarrollada para gestionar una colección personal de videojuegos. El objetivo principal del sistema es permitir que un usuario pueda consultar un catálogo de juegos, agregar títulos a su propia colección y registrar información relacionada con su progreso dentro de cada juego.

La aplicación está pensada como una herramienta de organización para jugadores, tomando como referencia plataformas modernas de seguimiento de videojuegos. A través del sistema, cada usuario podrá clasificar sus juegos según estado, plataforma y género, además de registrar datos personales como calificación y cantidad de horas jugadas.

El proyecto fue desarrollado como trabajo práctico para la cátedra de Programación III en la UTN FRBB. En esta segunda entrega se trabaja sobre una arquitectura full-stack compuesta por un frontend en React, un backend en Node.js con Express, una base de datos PostgreSQL administrada mediante Sequelize y un entorno de ejecución basado en Docker Compose.

Durante la primera etapa del desarrollo, el foco está puesto principalmente en el backend y la base de datos. Por este motivo, se prioriza la creación de modelos, migraciones, seeders, rutas REST, controladores, validaciones, documentación técnica y pruebas manuales de la API.

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