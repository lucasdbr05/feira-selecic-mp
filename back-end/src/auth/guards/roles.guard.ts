import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserService } from '../../user/user.service';
import { JwtPayload } from '../types';
import { Role } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(UserService) private usersService: UserService,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;

    const user: JwtPayload = context.switchToHttp().getRequest().user;

    return new Promise((resolve) => {
      this.usersService
        .getRole(user.id)
        .then((role) => {
          const hasRole = requiredRoles.some((r) => r === role);
          resolve(hasRole);
        })
        .catch(() => resolve(false));
    });
  }
}
