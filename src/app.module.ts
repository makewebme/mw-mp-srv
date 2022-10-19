import { Module } from '@nestjs/common'

import { ConfigModule } from './config.module'
import { TypeOrmModule } from '@db/typeorm.module'
import { RedisModule } from '@services/redis/redis.module'

import { UserModule } from '@entities/user/user.module'
import { ProductModule } from '@entities/product/product.module'


@Module({
  imports: [
    ConfigModule,
    TypeOrmModule,
    RedisModule,

    UserModule,
    ProductModule,
  ],
})
export class AppModule {}
