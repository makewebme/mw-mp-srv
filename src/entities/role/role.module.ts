import { MiddlewareConsumer, Module } from '@nestjs/common'

import { RoleController } from './role.controller'
import { RequestsLoggerMiddleware } from '@helpers/requestsLogger.middleware'


@Module({
  controllers: [ RoleController ],
})
export class RoleModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestsLoggerMiddleware).forRoutes(RoleController)
  }
}
