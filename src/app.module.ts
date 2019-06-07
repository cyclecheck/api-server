import { Logger, Module } from '@nestjs/common'

import { AdminModule } from './admin/admin.module'
import { AppController } from './app.controller'
import { ConfigModule } from './config/config.module'
import { ConfigService } from './config/config.service'
import { DatabaseModule } from './database/database.module'
import { LocationModule } from './location/location.module'
import { prettyPrint } from './util/misc'
import { VersionModule } from './version/version.module'
import { WeatherModule } from './weather/weather.module'

@Module({
  imports: [
    ConfigModule,
    VersionModule,
    DatabaseModule,
    AdminModule,
    WeatherModule,
    LocationModule,
  ],
  controllers: [AppController],
})
export class AppModule {
  private readonly logger = new Logger('AppModule')

  constructor(config: ConfigService) {
    this.logger.debug(`Using config: ${prettyPrint(config.config)}`)
  }
}
