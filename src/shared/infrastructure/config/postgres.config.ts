import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

export const getPostgresConfig = (configService: ConfigService): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: configService.get('DB_HOST', 'localhost'),
    port: configService.get('DB_PORT', 5432),
    username: configService.get('DB_USERNAME', 'postgres'),
    password: configService.get('DB_PASSWORD', 'postgres'),
    database: configService.get('DB_DATABASE', 'nestjs_ddd'),
    
    // Configuración de entidades
    entities: [join(__dirname, '../../../**/*.entity{.ts,.js}')],
    
    // Configuración de migraciones
    migrations: [join(__dirname, '../../../**/migrations/*{.ts,.js}')],
    migrationsRun: true,
    migrationsTableName: 'migrations',
    
    // Configuración de logging
    logging: configService.get('DB_LOGGING', 'false') === 'true',
    logger: 'advanced-console',
    
    // Configuración de conexión
    synchronize: configService.get('NODE_ENV', 'development') === 'development',
    ssl: configService.get('DB_SSL', 'false') === 'true',
    keepConnectionAlive: true,
    
    // Configuración de pool
    poolSize: configService.get('DB_POOL_SIZE', 10),
    connectTimeoutMS: 10000,
    
    // Configuración de replicación
    replication: {
      master: {
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD', 'postgres'),
        database: configService.get('DB_DATABASE', 'nestjs_ddd'),
      },
      slaves: configService.get('DB_SLAVES', []).map((slave: any) => ({
        host: slave.host,
        port: slave.port,
        username: slave.username,
        password: slave.password,
        database: slave.database,
      })),
    },
  };
}; 