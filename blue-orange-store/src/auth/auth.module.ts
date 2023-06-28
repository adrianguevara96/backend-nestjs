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
import { Auth } from './auth.entity';

// strategies
// import { LocalStrategy } from './strategies/local.strategy';
// import { JwtStrategy } from './strategies/jwt.strategy';

// config
import config from './../config';

@Module({
    controllers: [
        AuthController
    ],
    exports: [

    ],
    imports: [
        UsersModule,
        PassportModule,
        TypeOrmModule.forFeature([Auth]),
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
        // LocalStrategy,
        // JwtStrategy
    ]
})
export class AuthModule {}
