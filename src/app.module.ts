import { Module, Logger } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { LocationModule } from './location/location.module'
import { ConfigModule } from './config/config.module'
import { ConfigService } from './config/config.service'
import { prettyPrint } from './util/misc'

@Module({
  imports: [ConfigModule, LocationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  private readonly logger = new Logger('AppModule')

  constructor(config: ConfigService) {
    this.logger.debug(`Using config: ${prettyPrint(config.config)}`)
  }
}
