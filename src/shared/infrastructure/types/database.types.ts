export interface IPostgresSlaveConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface IPostgresConfig {
  master: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
  slaves?: IPostgresSlaveConfig[];
}

export interface IDatabaseConfig {
  postgres: IPostgresConfig;
}
