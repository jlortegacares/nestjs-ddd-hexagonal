# NestJS DDD Hexagonal Architecture Example

Este proyecto es una implementación de ejemplo de Domain-Driven Design (DDD) y Arquitectura Hexagonal utilizando NestJS, PostgreSQL y Redis.

## Arquitectura

El proyecto sigue los principios de:
- Domain-Driven Design (DDD)
- Arquitectura Hexagonal (Ports & Adapters)
- CQRS (Command Query Responsibility Segregation)
- Event Sourcing

### Estructura del Proyecto

```
src/
├── contexts/                # Bounded contexts
│   └── user-management/    # User Management Context
│       ├── domain/         # Domain layer (entities, value objects, domain events)
│       ├── application/    # Application layer (use cases, ports)
│       └── infrastructure/ # Infrastructure layer (controllers, repositories)
└── shared/                 # Shared kernel
    ├── domain/            # Shared domain primitives
    └── infrastructure/    # Shared infrastructure components
```

## Bounded Contexts

### User Management
- Gestión de usuarios y autenticación
- Entidades principales: User
- Casos de uso: Registro, autenticación, actualización de perfil

## Tecnologías

- **Framework:** NestJS v10
- **Base de Datos:** PostgreSQL
- **Cache:** Redis
- **Documentación:** Swagger/OpenAPI
- **Testing:** Jest
- **ORM:** TypeORM
- **Validación:** class-validator
- **Linting:** ESLint + Prettier
- **Package Manager:** pnpm
- **Node.js:** v23.0.0 o superior

## Requisitos

- Node.js v23.0.0 o superior
- PostgreSQL
- Redis
- pnpm 8.0.0 o superior

## Configuración

1. Asegúrate de tener la versión correcta de Node.js:
```bash
# Usando nvm (recomendado)
nvm install 23
nvm use 23

# O verifica tu versión actual
node --version # Debe mostrar v23.x.x
```

2. Clonar el repositorio:
```bash
git clone https://github.com/jlortegacares/nestjs-ddd-hexagonal.git
cd nestjs-ddd-hexagonal
```

3. Instalar pnpm (si no está instalado):
```bash
npm install -g pnpm@latest
```

4. Instalar dependencias:
```bash
pnpm install
```

4. Configurar variables de entorno:
```bash
cp .env.example .env
```

5. Configurar la base de datos:
```bash
# Crear la base de datos en PostgreSQL
createdb nestjs_ddd
```

## Gestión de Migraciones

El proyecto utiliza TypeORM para gestionar las migraciones de la base de datos. Los siguientes comandos están disponibles:

```bash
# Generar una nueva migración basada en los cambios de las entidades
pnpm migration:generate src/migrations/nombre-migracion

# Crear una migración vacía para personalización manual
pnpm migration:create src/migrations/nombre-migracion

# Ejecutar todas las migraciones pendientes
pnpm migration:run

# Revertir la última migración aplicada
pnpm migration:revert
```

La configuración de las migraciones se encuentra en `src/config/typeorm.config.ts`. Las migraciones se almacenan en el directorio `src/migrations/`.

## Desarrollo

```bash
# Desarrollo
pnpm start:dev

# Producción
pnpm build
pnpm start:prod
```

## Testing

```bash
# Unit tests
pnpm test

# e2e tests
pnpm test:e2e

# Test coverage
pnpm test:cov
```

## Documentación API

La documentación de la API está disponible en Swagger UI:
```
http://localhost:3000/api
```

## Convenciones de Código

### Linting y Formateo

El proyecto utiliza ESLint y Prettier con reglas estrictas:

```bash
# Verificar código
pnpm lint

# Corregir problemas automáticamente
pnpm lint:fix
```

### Reglas Principales

- Tipos TypeScript estrictos
- Prefijo 'I' para interfaces
- Una clase por archivo
- No permitir `any`
- Ordenamiento automático de importaciones
- Espaciado consistente

## Contribución

1. Crear una rama para tu feature: `git checkout -b feature/nombre-feature`
2. Commit de cambios: `git commit -m 'feat: add nombre-feature'`
3. Push a la rama: `git push origin feature/nombre-feature`
4. Crear Pull Request

## Licencia

[MIT](LICENSE) 