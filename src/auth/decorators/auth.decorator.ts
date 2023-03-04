import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UseRoleGuard } from '../guards/use-role.guard';
import { RoleProtected } from './role-protected.decorator';

export const Auth = (...args: string[]) => {
    return applyDecorators(
        RoleProtected(...args),
        UseGuards(AuthGuard(), UseRoleGuard)
    )
};
