import { ExtractJwt } from 'passport-jwt';
import * as dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT || 3000,
  name: process.env.NAME || 'rc',
  database: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../**/*.subscriber{.ts,.js}'],
    subscribers: [__dirname + '/migrations/*{.ts,.js}'],
    synchronize: true,
    logging: process.env.DEV ? true : false,
  },
  JwtModules: {
    secretOrKey: process.env.JWT_SECRET,
    expiresIn: Number(process.env.TIME_JWT_EXPIRATION)
  },
  Jwt: {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    ignoreExpiration: false
  },
};