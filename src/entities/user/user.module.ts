import { Module, MiddlewareConsumer } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from '@services/auth/auth.module'
import { RequestsLoggerMiddleware } from '@helpers/requestsLogger.middleware'
import { User } from './user.entity'
import { UserController } from './user.controller'
import { UserService } from './user.service'


@Module({
  imports: [
    TypeOrmModule.forFeature([ User ]),
    AuthModule,
  ],
  controllers: [ UserController ],
  providers: [ UserService ],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestsLoggerMiddleware).forRoutes(UserController)
  }
}
