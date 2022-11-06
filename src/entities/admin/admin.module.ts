import { Module, MiddlewareConsumer } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { RequestsLoggerMiddleware } from '@helpers/requestsLogger.middleware'
import { AuthModule } from '@services/auth/auth.module'
import { Admin } from './admin.entity'
import { AdminService } from './admin.service'
import { AdminController } from './admin.controller'


@Module({
  imports: [
    TypeOrmModule.forFeature([ Admin ]),
    AuthModule,
  ],
  controllers: [ AdminController ],
  providers: [ AdminService ],
  exports: [ AdminService ],
})
export class AdminModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestsLoggerMiddleware).forRoutes(AdminController)
  }
}
