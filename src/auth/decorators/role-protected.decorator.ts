import { SetMetadata } from '@nestjs/common';
export const META_ROLE_PROTECTED = 'roles';
export const RoleProtected = (...args: string[]) => SetMetadata(META_ROLE_PROTECTED, args);
