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
│   └── {context-name}/     # Each bounded context
│       ├── domain/         # Domain layer
│       ├── application/    # Application layer
│       └── infrastructure/ # Infrastructure layer
└── shared/                 # Shared kernel
    ├── domain/
    └── infrastructure/
```

## Requisitos

- Node.js (v18 o superior)
- PostgreSQL
- Redis
- npm o yarn

## Configuración

1. Clonar el repositorio:
```bash
git clone https://github.com/jlortegacares/nestjs-ddd-hexagonal.git
cd nestjs-ddd-hexagonal
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
```

4. Configurar la base de datos:
```bash
# Crear la base de datos en PostgreSQL
createdb nestjs_ddd
```

5. Ejecutar migraciones:
```bash
npm run typeorm:run-migrations
```

## Desarrollo

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

## Testing

```bash
# Unit tests
npm run test

# e2e tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Licencia

[MIT](LICENSE) 