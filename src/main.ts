import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { ConfigService } from './config/config.service'

async function bootstrap() {
  const logger = new Logger('Bootstrap')

  const app = await NestFactory.create(AppModule)
  const { port, host } = app.get<ConfigService>(ConfigService).config

  logger.log(`Starting server: http://${host}:${port}`)
  await app.listen(port, host)
}

// tslint:disable-next-line
bootstrap()
