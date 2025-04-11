# User Management Context

## Descripción

Este bounded context se encarga de la gestión de usuarios en el sistema, incluyendo registro, autenticación y gestión de perfiles.

## Estructura

```
user-management/
├── domain/           # Capa de dominio
│   ├── models/      # Entidades y agregados
│   ├── events/      # Eventos de dominio
│   └── repositories # Interfaces de repositorios
├── application/     # Capa de aplicación
│   ├── use-cases/   # Casos de uso (commands/queries)
│   └── ports/       # Puertos (interfaces)
└── infrastructure/  # Capa de infraestructura
    ├── adapters/    # Adaptadores
    └── persistence/ # Implementación de persistencia
```

## Componentes Principales

### Domain Layer

#### Entidades
- `User`: Agregado raíz que representa un usuario en el sistema

#### Value Objects
- `Email`: Representa un email válido
- `Password`: Representa una contraseña hasheada

#### Eventos de Dominio
- `UserCreatedDomainEvent`: Emitido cuando se crea un nuevo usuario
- `UserUpdatedDomainEvent`: Emitido cuando se actualiza un usuario

### Application Layer

#### Casos de Uso
- `CreateUserUseCase`: Registro de nuevos usuarios
- `AuthenticateUserUseCase`: Autenticación de usuarios
- `UpdateUserProfileUseCase`: Actualización de perfiles

### Infrastructure Layer

#### Adaptadores
- `UserController`: API REST para operaciones de usuarios
- `UserRepository`: Implementación TypeORM del repositorio

#### Persistencia
- `UserSchema`: Schema TypeORM para la entidad User

## Reglas de Negocio

1. El email debe ser único en el sistema
2. Las contraseñas deben tener al menos 8 caracteres
3. Los usuarios no pueden ser eliminados (soft delete)

## Eventos Publicados

Este contexto publica los siguientes eventos de dominio:

- `UserCreatedDomainEvent`
  - Cuando: Al crear un nuevo usuario
  - Datos: ID, email, timestamp

- `UserUpdatedDomainEvent`
  - Cuando: Al actualizar información del usuario
  - Datos: ID, campos actualizados, timestamp

## Endpoints API

### POST /users
- Crear un nuevo usuario
- Body: email, password, firstName, lastName
- Respuesta: 201 Created

### POST /users/login
- Autenticar usuario
- Body: email, password
- Respuesta: JWT token

### GET /users/me
- Obtener perfil del usuario actual
- Header: Authorization Bearer token
- Respuesta: Datos del usuario

### PUT /users/me
- Actualizar perfil del usuario
- Header: Authorization Bearer token
- Body: firstName, lastName
- Respuesta: Datos actualizados

## Tests

```bash
# Unit tests
npm run test src/contexts/user-management

# e2e tests
npm run test:e2e src/contexts/user-management
``` 