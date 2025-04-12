# NestJS DDD Example

Este proyecto es una implementación de ejemplo de Domain-Driven Design (DDD) utilizando NestJS, TypeScript, PostgreSQL y Redis.

## Características

- 🏗️ Arquitectura Hexagonal (Ports & Adapters)
- 📦 Domain-Driven Design (DDD)
- 🔄 CQRS Pattern
- 🔐 Clean Architecture
- 🗃️ PostgreSQL como base de datos principal
- 📝 Redis para caché y proyecciones
- 🔍 TypeORM para el manejo de la base de datos
- 🚀 NestJS como framework base

## Requisitos

- Node.js (v18 o superior)
- pnpm
- PostgreSQL
- Redis

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/yourusername/nestjs-ddd-example.git
cd nestjs-ddd-example
```

2. Instalar dependencias:
```bash
pnpm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
```

4. Iniciar la base de datos:
```bash
docker-compose up -d
```

5. Ejecutar migraciones:
```bash
pnpm migration:run
```

6. Iniciar la aplicación:
```bash
pnpm start:dev
```

## Estructura del Proyecto

```
src/
├── contexts/                    # Bounded contexts
│   └── user-management/        # User Management context
│       ├── application/        # Application layer
│       ├── domain/            # Domain layer
│       └── infrastructure/    # Infrastructure layer
├── shared/                    # Shared code
└── main.ts                    # Application entry point
```

## Documentación

- [Arquitectura](docs/architecture.md)
- [API](docs/api.md)
- [Base de Datos](docs/database.md)

## Contribuir

Las contribuciones son bienvenidas. Por favor, lee [CONTRIBUTING.md](CONTRIBUTING.md) para más detalles.

## Licencia

[MIT](LICENSE) 