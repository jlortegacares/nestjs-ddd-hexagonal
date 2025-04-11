# Shared Kernel

## Descripción

El Shared Kernel contiene código compartido entre todos los bounded contexts. Este código debe ser estable y cambiar con poca frecuencia, ya que los cambios aquí afectan a todos los contextos.

## Estructura

```
shared/
├── domain/           # Primitivas de dominio compartidas
│   ├── value-objects/
│   ├── events/
│   └── interfaces/
└── infrastructure/   # Componentes de infraestructura compartidos
    ├── persistence/
    ├── event-bus/
    └── logging/
```

## Componentes Principales

### Domain

#### Value Objects
- `UUID`: Identificador único universal
- `Timestamp`: Manejo de fechas y tiempos
- `Money`: Representación de valores monetarios

#### Interfaces
- `IAggregateRoot`: Interface base para agregados
- `IDomainEvent`: Interface base para eventos de dominio
- `IRepository`: Interface base para repositorios

### Infrastructure

#### Event Bus
- `EventBus`: Implementación del bus de eventos para comunicación entre contextos
- `EventSubscriber`: Base para suscriptores de eventos
- `EventPublisher`: Publicador de eventos

#### Persistence
- `BaseRepository`: Implementación base para repositorios
- `Transaction`: Manejo de transacciones
- `DatabaseConnection`: Configuración de conexión

#### Logging
- `Logger`: Servicio de logging
- `LoggerDecorator`: Decorador para logging automático

## Guías de Uso

### Cuándo Usar el Shared Kernel

1. Para código que es verdaderamente común entre contextos
2. Para interfaces y contratos compartidos
3. Para utilidades de infraestructura comunes

### Cuándo NO Usar el Shared Kernel

1. Para lógica específica de un contexto
2. Para código que cambia frecuentemente
3. Para implementaciones que podrían variar entre contextos

## Reglas de Desarrollo

1. Los cambios deben ser aprobados por el equipo de arquitectura
2. Mantener al mínimo las dependencias
3. Documentar todos los componentes públicos
4. Incluir tests exhaustivos

## Ejemplos de Uso

### Event Bus
```typescript
// Publicar un evento
await eventBus.publish(new UserCreatedEvent({ id, email }));

// Suscribirse a un evento
@EventSubscriber(UserCreatedEvent)
export class WelcomeEmailHandler implements IEventHandler {
  handle(event: UserCreatedEvent): Promise<void> {
    // Lógica del handler
  }
}
```

### Value Objects
```typescript
// Crear un UUID
const id = UUID.create();

// Usar Money
const price = Money.fromDecimal(99.99, 'USD');
```

## Testing

```bash
# Unit tests
npm run test src/shared

# Integration tests
npm run test:integration src/shared
``` 