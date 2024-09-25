declare type ProcessEnvFields =
  // Base
  | 'NODE_ENV'
  | 'PORT'
  | 'ANALYTICS_BASE_URL'
  | 'ASTROLOGICAL_REPORTS_BASE_URL'

  // PostgreSQL
  | 'POSTGRESQL_HOST'
  | 'POSTGRESQL_PORT'
  | 'POSTGRESQL_USERNAME'
  | 'POSTGRESQL_PASSWORD'
  | 'POSTGRESQL_NAME'

  // Redis
  | 'REDIS_PREFIX'
  | 'REDIS_HOST'
  | 'REDIS_PORT'
  | 'REDIS_PASSWORD';

declare namespace NodeJS {
  export type ProcessEnv = Record<ProcessEnvFields, string>;
}
