import { Module, Logger } from '@nestjs/common'

import { LocationModule } from './location/location.module'
import { ConfigModule } from './config/config.module'
import { ConfigService } from './config/config.service'
import { prettyPrint } from './util/misc'
import { DatabaseModule } from './database/database.module'

@Module({
  imports: [ConfigModule, DatabaseModule, LocationModule],
})
export class AppModule {
  private readonly logger = new Logger('AppModule')

  constructor(config: ConfigService) {
    this.logger.debug(`Using config: ${prettyPrint(config.config)}`)
  }
}
