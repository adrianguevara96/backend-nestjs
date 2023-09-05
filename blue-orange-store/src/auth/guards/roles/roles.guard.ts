import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/auth/models/role.model';
import { PayloadToken } from 'src/models/token.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get(ROLES_KEY, context.getHandler());
    // [ 'admin', 'customer', 'user' ]
    if (!roles) return true;

    // get request
    const request = context.switchToHttp().getRequest();

    // get user
    const user = request.user as PayloadToken;

    // is auth?
    const isAuth = roles.includes(user.role as Role);
    if (!isAuth) {
      throw new ForbiddenException('Role wrong');
    }
    return isAuth;
  }
}
