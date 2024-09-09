# DropShare

DropShare es una aplicación web la cual te permite compartir archivos fácilmente, con solo ingresar al sitio web podrás subir tu imagen, documento PDF, Word, archivo RAR o cualquier otro para que la aplicación te genere un enlace para compartirlo con quien quieras.

## Instalación

1. Clonar el repositorio

```bash
git clone https://github.com/DarioRv/post-app-nest.git
```

2. Instalar las dependencias

```bash
pnpm install
```

3. Configurar las variables de entorno

Copiar el archivo `.env.template` y renombrarlo a `.env`. Ajustar los valores de las variables.

Ejemplo:

```bash
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=root
DB_NAME=post-app-nest
JWT_SECRET=secret-key
```

## Ejecutar la aplicación

### Modo desarrollo

1. Ejecutar una base de datos con motor MySQL.
2. Ejecutar el siguiente comando:

```bash
pnpm run start:dev
```

### Docker

1. Ajustar el valor de la variable `DB_HOST` a `db`
2. Ejecutar el siguiente comando:

```bash
docker-compose -f docker-compose.yml --env-file .env up --build
```

## Documentación

La documentación de la API se encuentra realizada con Swagger y puede ser accedida desde la URL:

```
localhost:3000/api
```

## Stack

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-A81D33?style=for-the-badge&logo=typeorm&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
