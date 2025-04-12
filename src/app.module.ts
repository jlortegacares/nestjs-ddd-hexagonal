import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { UserManagementModule } from './contexts/user-management/infrastructure/user-management.module';
import { PostgresModule } from './shared/infrastructure/postgres/postgres.module';

@Module({
  imports: [
    // Configuración global
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    // Base de datos
    PostgresModule,
    
    // Módulos de la aplicación
    CqrsModule,
    UserManagementModule,
  ],
})
export class AppModule {}
 