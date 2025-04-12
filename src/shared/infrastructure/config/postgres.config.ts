import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { join } from 'path';

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get('DB_HOST', 'localhost'),
      port: this.configService.get('DB_PORT', 5432),
      username: this.configService.get('DB_USERNAME', 'postgres'),
      password: this.configService.get('DB_PASSWORD', 'postgres'),
      database: this.configService.get('DB_DATABASE', 'nestjs_ddd'),
      entities: [join(__dirname, '../../../**/*.entity{.ts,.js}')],
      migrations: [join(__dirname, '../../../**/migrations/*{.ts,.js}')],
      autoLoadEntities: true,
      synchronize: this.configService.get('NODE_ENV') === 'development',
      logging: this.configService.get('DB_LOGGING', 'false') === 'true',
      ssl: this.configService.get('DB_SSL', 'false') === 'true',
    } as TypeOrmModuleOptions;
  }
}
