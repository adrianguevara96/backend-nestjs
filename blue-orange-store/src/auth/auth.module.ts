/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// controllers
import { AuthController } from './auth.controller';

// services
import { AuthService } from './auth.service';

// modules
import { UsersModule } from 'src/users/users.module';

// entity
import { LocalAuth, OAuth } from './auth.entity';

// strategies
import { LocalStrategy } from './strategies/local.strategy';
import { JWTStrategy } from './strategies/jwt.strategy';

// config
import config from './../config';
import { GoogleStrategy } from './strategies/google.strategy';
import { User } from 'src/users/user.entity';

@Module({
  controllers: [AuthController],
  exports: [],
  imports: [
    UsersModule,
    PassportModule,
    TypeOrmModule.forFeature([LocalAuth, OAuth, User]),
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.jwt.secret,
          signOptions: {
            expiresIn: configService.jwt.expires,
          },
        };
      },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JWTStrategy,
    GoogleStrategy
  ],
})
export class AuthModule {}
