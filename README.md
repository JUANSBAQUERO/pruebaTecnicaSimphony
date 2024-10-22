# Documentación de la API para gestionar usuarios y servicios.

Este proyecto es un backend desarrollado con **NestJS** y **TypeScript** para gestionar servicios y asignarlos a usuarios. Implementa buenas prácticas de desarrollo, siguiendo una arquitectura modular y utilizando TypeORM para la interacción con una base de datos **PostgreSQL**.

No dejo comando de migracion de db ya que el código esta con la sincorinización automatica, es decir, despues de la configuración inicial mencionada a continuación y ejecutado el comando para correr el servidor las tablas se van a generar automaticamente.

## Funcionalidades

- **Gestión de Usuarios**: Permite registrar y autenticar usuarios mediante JWT, asegurando el acceso a la API.
- **Gestión de Servicios**: Proporciona endpoints para crear, listar y eliminar servicios, permitiendo la asignación de estos a los usuarios.
- **Documentación de la API**: La API está documentada con **Swagger**, facilitando la interacción y pruebas de los endpoints.
- **Eliminación Lógica**: Se utiliza un enfoque de eliminación lógica mediante el campo `deletedAt`, manteniendo un registro de los servicios eliminados sin perder información.

## Tecnologías Utilizadas

- **NestJS**: Framework para construir aplicaciones del lado del servidor.
- **TypeScript**: Superset de JavaScript que agrega tipado estático.
- **PostgreSQL**: Sistema de gestión de bases de datos relacional.
- **TypeORM**: ORM que facilita la interacción con la base de datos.
- **Swagger**: Herramienta para documentar y probar APIs REST.

Este proyecto ha sido diseñado para cumplir con los requisitos establecidos en la prueba técnica, mostrando las habilidades necesarias para el desarrollo backend en un entorno profesional.

## Requisitos

- Node.js (v22.0.0 o superior)
- PostgreSQL

## Pasos para clonar y ejecutar el proyecto

1. Clona el repositorio:

   ```bash
   git clone https://github.com/JUANSBAQUERO/pruebaTecnicaSimphony.git

2. Accede al directorio del proyecto:

   ```bash
   cd pruebaTecnicaSimphony

3. En la raiz del proyecto crear un archivo .env con la siguiente estructura

   ```bash
   DB_HOST=valor
   DB_PORT=valor
   DB_USERNAME=valor
   DB_PASSWORD=valor
   DB_NAME=valor
   JWT_SECRET=valor
   JWT_EXPIRES_IN=1h

asegurate de tener una base de datos PostgreSQL limpia y que los valores se ajusten a la configuración de la misma.

4. Instala las dependencias

   ```bash
   npm install 

5. Ejecuta los seeders para cargar datos iniciales. Para llenar la base de datos con datos iniciales, ejecuta el siguiente comando:

   ```bash
   ts-node seed.ts

6. Inicia el servidor

   ```bash
   npm run start:dev

7. Si quiere correr las pruebas unitarias ejecutar:

   ```bash
   npm run test

## Instrucciones para acceder a la documentación de Swagger

Una vez que el servidor esté en ejecución, puedes acceder a la documentación de Swagger en la siguiente URL:

   ```bash
   http://localhost:3000/api

