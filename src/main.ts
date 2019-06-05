import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'

import { AppModule } from './app.module'
import { ConfigService } from './config/config.service'
import { isDev } from './config/environment'

async function bootstrap() {
  const logger = new Logger('Bootstrap')

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: isDev() }),
  )
  const { port, host } = app.get(ConfigService).config

  logger.log(`Starting server: http://${host}:${port}`)
  await app.listen(port, host)
}

// tslint:disable-next-line
bootstrap()
