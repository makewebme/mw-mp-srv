import { Module } from '@nestjs/common'
import { JwtModule as NestJwtModule } from '@nestjs/jwt'

import { JwtService } from './jwt.service'
import { RedisModule } from '@services/redis/redis.module'


@Module({
  imports: [
    NestJwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: Number(process.env.JWT_EXPIRE) * 1000
      },
    }),
    RedisModule,
  ],
  providers: [ JwtService ],
  exports: [ JwtService ]
})
export class JwtModule {}
