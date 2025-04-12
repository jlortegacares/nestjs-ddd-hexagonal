import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';

import { UserManagementModule } from './contexts/user-management/infrastructure/user-management.module';
import { PostgresModule } from './shared/infrastructure/postgres/postgres.module';
import { RedisModule } from './shared/infrastructure/redis/redis.module';

@Module({
  imports: [
    // Configuración global
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Base de datos
    PostgresModule,
    RedisModule,

    // Módulos de la aplicación
    CqrsModule,
    UserManagementModule,
  ],
})
export class AppModule {}
