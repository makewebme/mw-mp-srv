import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { BearerParser } from 'bearer-token-parser'

import { RedisService } from '@services/redis/redis.service'


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly redis: RedisService,
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
    })
  }

  async validate(req: Request) {
    const jwt = BearerParser.parseBearerToken(req.headers)
    const sessionData = await this.redis.get(jwt)

    if (!sessionData) {
      throw new UnauthorizedException()
    } else {
      return sessionData
    }
  }
}
