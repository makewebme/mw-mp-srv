import { Controller, Get, HttpStatus, UseGuards, HttpCode } from '@nestjs/common'

import { RoleGuard } from '@guards/role.guard'
import { E_Role, E_AdminRole } from './role.enum'


@Controller('roles')
export class RoleController {
  @Get('/admin')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RoleGuard(E_Role.SuperAdmin))
  async getReportBetweenDateFromAndTo() {
    return { status: 'ok', data: E_AdminRole }
  }
}
