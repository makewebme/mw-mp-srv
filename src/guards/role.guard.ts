import { CanActivate, ExecutionContext, Type, mixin } from '@nestjs/common'

import { E_Role } from '@entities/role/role.enum'
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard'


export const RoleGuard = (...roles: E_Role[]): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context)
      const user = context.switchToHttp().getRequest().user
      return roles.includes(user.role)
    }
  }

  return mixin(RoleGuardMixin)
}
