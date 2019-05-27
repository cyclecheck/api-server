import { Logger, Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'

import { ConfigModule } from './config/config.module'
import { ConfigService } from './config/config.service'
import { DatabaseModule } from './database/database.module'
import { LocationModule } from './location/location.module'
import { SessionGuard } from './session/session.guard'
import { prettyPrint } from './util/misc'
import { WeatherController } from './weather/weather.controller'
import { WeatherModule } from './weather/weather.module'

@Module({
  imports: [ConfigModule, DatabaseModule, WeatherModule, LocationModule],
  controllers: [WeatherController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: SessionGuard,
    },
  ],
})
export class AppModule {
  private readonly logger = new Logger('AppModule')

  constructor(config: ConfigService) {
    this.logger.debug(`Using config: ${prettyPrint(config.config)}`)
  }
}
