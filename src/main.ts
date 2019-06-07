import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'

import { AppModule } from './app.module'
import { ConfigService } from './config/config.service'
import { isDev } from './config/environment'
import { getVersion } from './version/version'

export async function bootstrap() {
  const logger = new Logger('Bootstrap')

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: isDev() }),
  )

  const {
    config: { port, host },
    isDevMode,
  } = app.get<ConfigService>(ConfigService)

  logger.log(`Current version: ${getVersion({ isDevMode })}`)
  logger.log(`Starting server: http://${host}:${port}`)
  await app.listen(port, host)
}
