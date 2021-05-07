const Joi = require('joi');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test', 'homolog', 'provision'])
    .default('development'),
  PORT: Joi.number().default(4040),
  MONGOOSE_DEBUG: Joi.boolean().when('NODE_ENV', {
    is: Joi.string().equal('development'),
    then: Joi.boolean().default(true),
    otherwise: Joi.boolean().default(false),
  }),
  MONGO_IP: Joi.string().required().description('Database connection IP'),
  MONGO_PORT: Joi.number().default(27017).description('Database connection port'),
  MONGO_USER: Joi.string().required().description('Database connection user'),
  MONGO_PASSWORD: Joi.string().required().description('Database connection password'),
  MONGO_DATABASE: Joi.required().description('Default database'),
}).unknown()
.required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongooseDebug: envVars.MONGOOSE_DEBUG,
  mongo: {
    ip: envVars.NODE_ENV === 'test' ? `${envVars.MONGO_IP}-test` : envVars.MONGO_IP,
    port: envVars.NODE_ENV === 'test' ? `${envVars.MONGO_PORT}-test` : envVars.MONGO_PORT,
    user: envVars.NODE_ENV === 'test' ? `${envVars.MONGO_USER}-test` : envVars.MONGO_USER,
    password: envVars.NODE_ENV === 'test' ? `${envVars.MONGO_PASSWORD}-test` : envVars.MONGO_PASSWORD,
    database: envVars.NODE_ENV === 'test' ? `${envVars.MONGO_DATABASE}-test` : envVars.MONGO_DATABASE,
  },
};

module.exports = config;
