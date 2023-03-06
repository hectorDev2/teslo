import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from '../entities/user.entity';

@Injectable()
export class UseRoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
  ) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const activeRoles = this.reflector.get<string[]>('roles', context.getHandler());


    const request = context.switchToHttp().getRequest();
    const user = request.user as User;

    if (!user) {
      throw new UnauthorizedException('user not found');
    }

    for (const role of user.roles) {
      if (activeRoles.includes(role)) {
        return true;
      }
    }
    throw new ForbiddenException('user not have permission to access this route')
  }
}
