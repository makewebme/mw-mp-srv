import { join } from 'path'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'

import { AppModule } from './app.module'


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.useGlobalPipes(new ValidationPipe())

  app.useStaticAssets(join(__dirname, '..', 'storage'))

  app.enableCors({
    origin: '*',
    allowedHeaders: '*',
    methods: '*',
  })

  await app.listen(process.env.SERVER_PORT)
}

bootstrap()
