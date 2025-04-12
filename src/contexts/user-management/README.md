# User Management Context

Este contexto bounded se encarga de la gestión de usuarios en el sistema.

## Dominio

### Entidades
- `User`: Representa un usuario en el sistema
  - Propiedades: email, password (hash), firstName, lastName
  - Comportamientos: cambiar contraseña, actualizar perfil

### Value Objects
- `Email`: Representa un email válido
- `Password`: Representa una contraseña hasheada

### Eventos de Dominio
- `UserCreatedDomainEvent`: Emitido cuando se crea un nuevo usuario
- `UserPasswordChangedDomainEvent`: Emitido cuando un usuario cambia su contraseña

## Casos de Uso

### Comandos
- `CreateUserUseCase`: Registrar un nuevo usuario
- `ChangePasswordUseCase`: Cambiar contraseña de usuario
- `UpdateUserProfileUseCase`: Actualizar perfil de usuario

### Queries
- `GetUserByIdQuery`: Obtener usuario por ID
- `GetUserByEmailQuery`: Obtener usuario por email

## Infraestructura

### Controllers
- `UserController`: Endpoints REST para gestión de usuarios
  - POST /users: Crear usuario
  - PUT /users/:id/password: Cambiar contraseña
  - PUT /users/:id/profile: Actualizar perfil

### Repositorios
- `PostgresUserRepository`: Implementación PostgreSQL del repositorio de usuarios

### Cache
- Caché de perfiles de usuario en Redis
- TTL: 24 horas

## Integración con otros Contextos

### Eventos Publicados
- `UserCreatedDomainEvent`: Notifica a otros contextos sobre nuevos usuarios
- `UserPasswordChangedDomainEvent`: Notifica cambios de contraseña

### Eventos Consumidos
- Ninguno actualmente

## Testing

```bash
# Tests unitarios del contexto
pnpm test src/contexts/user-management

# Tests e2e del contexto
pnpm test:e2e src/contexts/user-management
``` 