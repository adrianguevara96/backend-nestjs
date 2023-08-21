import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

import config from '../config';

const API_KEY = '12345678';
const API_KEY_PROD = 'PROD12345678';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { username, password, name, port, host, type } =
          configService.database;
        // return object.assign({...})
        return {
          type: type,
          host: host,
          port: parseInt(port, 10),
          username: username,
          password: password,
          database: name,
          // entities: [join(__dirname, '/../**/**.entity{.ts,.js}')],
          // synchronize: false,
          synchronize: true,
          autoLoadEntities: true,
        } as DataSourceOptions;
      },
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
