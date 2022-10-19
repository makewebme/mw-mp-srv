import { Module } from '@nestjs/common'
import { JwtModule as NestJwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { RedisModule } from '@services/redis/redis.module'
import { JwtService } from './jwt.service'
import { JwtStrategy } from './jwt.strategy'


@Module({
  imports: [
    NestJwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: Number(process.env.JWT_EXPIRE) * 1000
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    RedisModule,
  ],
  providers: [ JwtService, JwtStrategy ],
  exports: [ JwtService ]
})
export class JwtModule {}
