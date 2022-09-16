import { Controller, Get, Post, Req, Res, Put, Delete, Param, ParseIntPipe, Body, HttpCode, HostParam } from '@nestjs/common'
import { Response, Request } from 'express'

import { UserService } from './user.service'
import { UpdateUserDto } from './dto/updateUser.dto'

@Controller({ path: 'users' })
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get('/')
  @HttpCode(200)
  async getAllUsers(
    @Res({ passthrough: true }) res: Response,
    @HostParam('account') account: string 
  ) {
    const users = await this.userService.getAllUsers()

    return {
      status: 'ok',
      data: users,
    }
  }

  @Get('/:id')
  async getUser(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const userData = await this.userService.getUserData(id)

    return res.send({
      status: 'ok',
      data: userData,
    })
  }

  @Post('/')
  async createUser(
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.userService.createUser(req.body)
    return res.send({ status: 'ok' })
  }

  @Put('/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
    @Res() res: Response,
  ) {
    this.userService.updateUserData(id, body)
    return res.send({ status: 'ok' })
  }

  @Delete('/:id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    this.userService.deleteUser(id)
    return res.send({ status: 'ok' })
  }
}