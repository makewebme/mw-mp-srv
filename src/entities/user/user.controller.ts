import {
  Controller, Get, Post, Put, Delete,
  Param, ParseIntPipe, Body, HttpCode, HttpStatus,
} from '@nestjs/common'
import { compare } from 'bcrypt'

import { ForbiddenException } from '@helpers/exceptions'
import { UserService } from './user.service'
import { UpdateUserDto } from './dto/updateUser.dto'
import { LoginUserDto } from './dto/loginUser.dto'
import { RegisterUserDto } from './dto/registerUser.dto'


@Controller({ path: 'users' })
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getAllUsers() {
    const users = await this.userService.getAllUsers()
    return { status: 'ok', data: users }
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getUser(@Param('id', ParseIntPipe) id: number) {
    const userData = await this.userService.getUserById(id)
    return { status: 'ok', data: userData }
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginUserDto) {
    const { loginOrEmail, password } = body

    const foundUser = await this.userService.getUserByLoginOrEmail(loginOrEmail)

    if (!foundUser) throw new ForbiddenException()

    const isPasswordMatch = await compare(password, foundUser.password)

    if (!isPasswordMatch) throw new ForbiddenException()

    return { status: 'ok', data: null }
  }

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: RegisterUserDto) {
    await this.userService.createUser(body)
    return { status: 'ok', data: null }
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    this.userService.updateUserData(id, body)
    return { status: 'ok', data: null }
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    this.userService.deleteUser(id)
    return { status: 'ok', data: null }
  }
}
