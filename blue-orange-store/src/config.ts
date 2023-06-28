import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      type: process.env.DATABASE_TYPE,
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      name: process.env.DATABASE_NAME,
      entities: process.env.DATABASE_ENTITIES,
      synchronize: process.env.DATABASE_SYNCHRONIZE,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expires: process.env.JWT_EXPIRES_IN,
    },
    apiKey: process.env.API_KEY,
  };
});
