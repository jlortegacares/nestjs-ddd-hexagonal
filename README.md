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
npm run lint

# Corregir problemas automáticamente
npm run lint:fix
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