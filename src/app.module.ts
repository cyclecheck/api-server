import { Logger, Module } from '@nestjs/common'

import { ConfigModule } from './config/config.module'
import { ConfigService } from './config/config.service'
import { DatabaseModule } from './database/database.module'
import { LocationModule } from './location/location.module'
import { prettyPrint } from './util/misc'
import { WeatherService } from './weather/weather.service'

@Module({
  imports: [ConfigModule, DatabaseModule, LocationModule],
  providers: [WeatherService],
})
export class AppModule {
  private readonly logger = new Logger('AppModule')

  constructor(config: ConfigService) {
    this.logger.debug(`Using config: ${prettyPrint(config.config)}`)
  }
}
