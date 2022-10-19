import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'

import { User } from './user.entity'
import { UserController } from './user.controller'
import { UserService } from './user.service'


@Module({
  imports: [
    TypeOrmModule.forFeature([ User ]),
    JwtModule,
  ],
  controllers: [ UserController ],
  providers: [ UserService ],
})
export class UserModule {}
