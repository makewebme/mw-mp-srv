import { Module, MiddlewareConsumer } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { RequestsLoggerMiddleware } from '@helpers/requestsLogger.middleware'
import { Product } from './product.entity'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'


@Module({
  imports: [ TypeOrmModule.forFeature([ Product ]) ],
  controllers: [ ProductController ],
  providers: [ ProductService ],
})
export class ProductModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestsLoggerMiddleware).forRoutes(ProductController)
  }
}
