# POT API DQD

API backend para sincronización de campañas, POTs y ensayos desde dispositivos de campo.

## Descripción

Aplicación backend construida con NestJS 11 que expone servicios de sincronización bidireccional para la app móvil de ensayos POT. Los dispositivos de campo suben y descargan campañas, POTs y ensayos mediante autenticación por API key. Utiliza TypeORM con una conexión a SQL Server.

## Stack

- Node.js 20+
- NestJS 11
- TypeScript
- TypeORM
- SQL Server (MSSQL)
- API Key para autenticación

## Requisitos

- Node.js 20+ instalado
- SQL Server accesible
- Archivo de variables de entorno `.env` configurado en la raíz

## Setup

```bash
npm install
```

Duplicar y completar el archivo `.env` con las credenciales reales.

```bash
npm run build
```

> Este repositorio no incluye un `.env.example`, por lo que debes crear el archivo manualmente.

## Variables de entorno

| Variable | Descripción |
|---|---|
| `DB_HOST` | Host de SQL Server |
| `DB_PORT` | Puerto de SQL Server |
| `DB_USERNAME` | Usuario de SQL Server |
| `DB_PASSWORD` | Contraseña de SQL Server |
| `DB_NAME` | Base de datos SQL Server |
| `API_KEY` | Clave de autenticación para los dispositivos |
| `PORT` | Puerto en el que corre la API (por defecto `3000`) |

## Scripts

| Script | Descripción |
|---|---|
| `npm run start` | Iniciar la aplicación en modo producción |
| `npm run start:dev` | Iniciar en modo desarrollo con watch |
| `npm run start:debug` | Iniciar en modo debug |
| `npm run start:prod` | Ejecutar la aplicación compilada |
| `npm run build` | Compilar el proyecto NestJS |
| `npm run lint` | Ejecutar ESLint y aplicar correcciones |
| `npm run test` | Ejecutar tests unitarios |
| `npm run test:e2e` | Ejecutar e2e tests |
| `npm run test:cov` | Ejecutar tests y generar cobertura |

## Endpoints

Todos los endpoints requieren el header `x-api-key` con la clave configurada en `.env`.

Base path: `/api/sync`

### Sincronización

- `POST /api/sync/upload` — subir campañas, POTs y ensayos desde el dispositivo
- `GET /api/sync/download` — descargar registros modificados desde una fecha
- `DELETE /api/sync/:tipo/:id` — soft delete de un registro (`tipo`: `campana`, `pot` o `ensayo`)

#### Body de upload

```json
{
  "campanas": [...],
  "pots": [...],
  "ensayos": [...],
  "deviceId": "string"
}
```

#### Query params de download

| Parámetro | Tipo | Descripción |
|---|---|---|
| `since` | number | Timestamp Unix en ms. Devuelve registros modificados desde esa fecha |
| `deviceId` | string | ID del dispositivo. Excluye registros originados en ese dispositivo |

## Arquitectura

El servidor está organizado con módulos NestJS en `src/modules` y proveedores compartidos en `src/common`.

- `modules/core`: módulos por entidad, cada uno con su service y entity
  - `campana`: upsert, lectura y soft delete con cascada a POTs
  - `pot`: upsert, lectura y soft delete con cascada a ensayos
  - `ensayo`: upsert, lectura y soft delete
- `modules/features/sync`: controlador, servicio orquestador y tipos de sincronización
- `common/guards`: `ApiKeyGuard` para autenticación por header
- `common/interceptors`: `LoggingInterceptor` para logging de requests HTTP
- `common/filters`: `AllExceptionsFilter` para manejo global de errores

## Estructura principal

```text
src/
  app.module.ts
  main.ts
  common/
    filters/
    guards/
    interceptors/
  modules/
    core/
      campana/
        entities/
      pot/
        entities/
      ensayo/
        entities/
    features/
      sync/
        types/
test/
  app.e2e-spec.ts
  jest-e2e.json
```

## Notas

- La configuración de TypeORM se carga desde `.env` usando `@nestjs/config`.
- El soft delete marca `deletedAt` y `syncedAt` en el registro y propaga en cascada a hijos.
- `fechaMod` es un timestamp Unix en ms que controla la versión del registro en el dispositivo.
