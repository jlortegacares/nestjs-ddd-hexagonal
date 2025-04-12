# Shared Kernel

Este módulo contiene código compartido entre todos los contextos bounded del sistema.

## Estructura

```
shared/
├── domain/             # Primitivas de dominio compartidas
│   ├── value-objects/  # Value objects base
│   ├── events/        # Eventos de dominio base
│   └── errors/        # Errores de dominio
└── infrastructure/    # Infraestructura compartida
    ├── config/       # Configuraciones (Redis, DB)
    ├── redis/        # Servicio de caché Redis
    └── types/        # Tipos y declaraciones TypeScript
```

## Componentes Principales

### Domain

#### Value Objects Base
- `Uuid`: Identificador único universal
- `Email`: Validación de email
- `Password`: Manejo de contraseñas

#### Eventos Base
- `DomainEvent`: Clase base para eventos de dominio
- `EventBus`: Interface para el bus de eventos

#### Errores
- `DomainError`: Error base de dominio
- `ValidationError`: Error de validación
- `NotFoundError`: Error de recurso no encontrado

### Infrastructure

#### Configuración Redis
- Configuración del cliente Redis
- Opciones de caché
- Variables de entorno

#### Servicio Redis
- Operaciones CRUD de caché
- Manejo de TTL
- Operaciones batch

## Uso

### Redis Cache

```typescript
import { RedisCacheService } from '@shared/infrastructure/redis/redis.service';

@Injectable()
export class MiServicio {
  constructor(private readonly cache: RedisCacheService) {}

  async getData(key: string): Promise<Data> {
    return this.cache.getOrSet(
      key,
      async () => this.fetchData(),
      3600 // TTL en segundos
    );
  }
}
```

### Value Objects

```typescript
import { Email, Password } from '@shared/domain/value-objects';

const email = new Email('user@example.com');
const password = await Password.create('myPassword123');
```

### Eventos de Dominio

```typescript
import { DomainEvent } from '@shared/domain/events';

export class MiEvento extends DomainEvent {
  constructor(
    public readonly aggregateId: string,
    public readonly data: any
  ) {
    super(aggregateId);
  }
}
```

## Testing

```bash
# Tests unitarios del módulo shared
pnpm test src/shared

# Tests de integración
pnpm test:e2e src/shared
``` 