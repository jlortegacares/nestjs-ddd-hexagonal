export interface PostgresSlaveConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface PostgresConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  logging: boolean;
  ssl: boolean;
  poolSize: number;
  slaves: PostgresSlaveConfig[];
}

export interface DatabaseConfig {
  postgres: PostgresConfig;
} 