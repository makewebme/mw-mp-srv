import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { RedisModule } from '@services/redis/redis.module'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'


@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: Number(process.env.JWT_EXPIRE) * 1000
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    RedisModule,
  ],
  providers: [ AuthService, JwtStrategy ],
  exports: [ AuthService ]
})
export class AuthModule {}
