import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { UsersService } from './../users/users.service';
import { User } from './../users/user.entity';
import { PayloadToken } from './../models/token.model';
import { Repository } from 'typeorm';
import { OAuth } from './auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(OAuth) private oAuthRepo: Repository<OAuth>,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    // console.log('user: ', user);
    const isMatch = await bcrypt.compare(password, user.data.password);
    if (user && isMatch) return this.generateJWT(user.data);
    return null;
  }

  async generateJWT(user: User) {
    const payload: PayloadToken = { sub: user.id, role: user.role };
    return {
      token: this.jwtService.sign(payload),
      user: user,
    };
  }

  async googleLogin(req) {
    if (!req.user) {
      throw new UnauthorizedException('No user from google');
    }

    let user: User;
    // find OAuth
    const oAuthUser = await this.oAuthRepo.findOne({
      where: { email: req.user.email, google: req.user.id },
    });
    if (oAuthUser) {
      user = await this.userRepo.findOne({
        where: { email: req.user.email },
      });
      return this.generateJWT(user);
    }

    // find User
    user = await this.userRepo.findOne({
      where: { email: req.user.email },
    });
    if (user) {
      // create a new OAuth
      const newGoogleOAuth = new OAuth();
      newGoogleOAuth.email = user.email;
      newGoogleOAuth.google = req.user.id;

      return this.generateJWT(user);
    }

    // create a new User
    const newGoogleUser = new User();
    newGoogleUser.name = req.user.firstName;
    newGoogleUser.lastName = req.user.lastName;
    newGoogleUser.email = req.user.email;
    newGoogleUser.status = 'active';

    // create a new OAuth
    const newGoogleOAuth = new OAuth();
    newGoogleOAuth.email = req.user.email;
    newGoogleOAuth.google = req.user.id;

    await this.oAuthRepo.save(newGoogleOAuth);
    const newUser = await this.userRepo.save(newGoogleUser);

    // return req.user;
    return this.generateJWT(newUser);
  }
}
