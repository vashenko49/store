import * as Joi from 'joi';

export const validationSchema = Joi.object<NodeJS.ProcessEnv>({
  PORT: Joi.number().required(),

  ANALYTICS_BASE_URL: Joi.string().required(),
  ASTROLOGICAL_REPORTS_BASE_URL: Joi.string().required(),

  /**
   * SQL
   */
  POSTGRESQL_HOST: Joi.string().required(),
  POSTGRESQL_PORT: Joi.number().required(),
  POSTGRESQL_USERNAME: Joi.string().required(),
  POSTGRESQL_PASSWORD: Joi.string().required(),
  POSTGRESQL_NAME: Joi.string().required(),

  /**
   * Redis
   */
  REDIS_PREFIX: Joi.string().required(),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),
  REDIS_PASSWORD: Joi.string().required(),
});
