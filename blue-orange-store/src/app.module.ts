import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// app
import { AppController } from './app.controller';
import { AppService } from './app.service';

// modules
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';

//environtments
import { environments } from './environments';
import { AuthModule } from './auth/auth.module';
import config from './config';

@Module({
  imports: [
    UsersModule, 
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.develop.env',
      load: [config],
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {}
