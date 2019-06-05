import { Module } from '@nestjs/common'

import { ConfigModule } from '../config/config.module'
import { LocationModule } from '../location/location.module'
import { WeatherClient } from './weather.client'
import { WeatherController } from './weather.controller'
import { WeatherService } from './weather.service'

@Module({
  imports: [ConfigModule, LocationModule],
  providers: [WeatherService, WeatherClient],
  controllers: [WeatherController],
  exports: [WeatherService],
})
export class WeatherModule {}
