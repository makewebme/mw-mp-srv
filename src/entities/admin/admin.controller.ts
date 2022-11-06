import {
  Body, Controller, Delete, Get, Param, Post,
  HttpStatus, HttpCode, HttpException, UseGuards,
} from '@nestjs/common'
import { compare } from 'bcrypt'

import { ForbiddenException } from '@helpers/exceptions'
import { ParsePositiveIntPipe } from '@helpers/parsePositiveInt.pipe'
import { SECOND_IN_MS } from '@consts/index'
import { AuthService } from '@services/auth/auth.service'
import { AdminService } from './admin.service'
import LoginDto from './dto/login.dto'
import RegisterDto from './dto/register.dto'
import { Admin } from './admin.entity'
import { RoleGuard } from 'src/guards/role.guard'
import { E_Role } from '@entities/role/role.enum'
// import { JwtAuthGuard } from '@services/jwt/jwt-auth.guard'


@Controller('admins')
export class AdminController {
  constructor(
    private adminService: AdminService,
    private authService: AuthService,
  ) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getAllAdmins() {
    try {
      const admins = await this.adminService.getAllAdmins()
      return { status: 'ok', data: admins }
    } catch (err) {
      throw new HttpException({
        status: 'error',
        message: `Error occurred while fetching admin data: "${err.message}"`,
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get('/:adminId')
  @HttpCode(HttpStatus.OK)
  // @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(E_Role.SuperAdmin))
  async getAdminData(@Param('adminId', ParsePositiveIntPipe) adminId: number) {
    try {
      const admin = await this.adminService.getAdminDataById(adminId)

      if (!admin) {
        throw new HttpException({
          status: 'error',
          message: `Admin with id ${adminId} not found`,
        }, HttpStatus.NOT_FOUND)
      }

      return { status: 'ok', data: admin }
    } catch (err: any) {
      throw new HttpException({
        status: 'error',
        message: `Error occurred while fetching admin data: "${err.message}"`,
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginDto) {
    const { loginOrEmail, password } = body

    const foundAdmin = await this.adminService.getAdminByLoginOrEmail(loginOrEmail)
    if (!foundAdmin) throw new ForbiddenException()

    const isPasswordMatch = await compare(password, foundAdmin.password)
    if (!isPasswordMatch) throw new ForbiddenException()

    if (!foundAdmin.isActive) {
      throw new HttpException({
        status: 'error',
        message: 'You are blocked',
      }, HttpStatus.FORBIDDEN)
    }

    let jwt: string

    try {
      jwt = await this.authService.setSession({
        id: foundAdmin.id,
        role: E_Role.SuperAdmin,
      })
    } catch (err: any) {
      throw new HttpException({
        status: 'error',
        message: `Error occurred while admin logging: "${err.message}"`,
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }

    return {
      status: 'ok',
      data: {
        accessToken: jwt,
        accessExpired: Number(process.env.JWT_EXPIRE) * SECOND_IN_MS,
        adminId: foundAdmin.id,
        role: foundAdmin.role,
      },
    }
  }

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async registerIndividual(@Body() body: RegisterDto) {
    let newAdmin: Admin

    const adminWithLogin = await this.adminService.getAdminByLoginOrEmail(body.login)
    const adminWithEmail = await this.adminService.getAdminByLoginOrEmail(body.email)

    if (adminWithLogin || adminWithEmail) {
      throw new HttpException({
        status: 'error',
        message: 'Admin with such login or email exists',
      }, HttpStatus.BAD_REQUEST)
    }

    try {
      newAdmin = await this.adminService.createAdmin(body)
    } catch (err) {
      throw new HttpException({
        status: 'error',
        message: `Error occurred while creating admin: "${err.message}"`,
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }

    return { status: 'ok', data: newAdmin }
  }

  @Delete('/:id/delete')
  @HttpCode(HttpStatus.OK)
  async deleteAdmin(@Param('id', ParsePositiveIntPipe) id: number) {
    try {
      const result = await this.adminService.deleteAdmin(id)

      if (!result?.affected) {
        throw new HttpException({
          status: 'error',
          message: 'Admin to delete not found',
        }, HttpStatus.NOT_FOUND)
      }

      return { status: 'ok', data: null }
    } catch (err: any) {
      throw new HttpException({
        status: 'error',
        message: `Error occurred while deleting admin: "${err.message}"`,
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
