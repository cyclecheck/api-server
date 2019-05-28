import { CacheModule, Module } from '@nestjs/common'

import { ConfigModule } from '../config/config.module'
import { LocationModule } from '../location/location.module'
import { WeatherClient } from './weather.client'
import { WeatherController } from './weather.controller'
import { WeatherService } from './weather.service'

const CACHE_TTL_WEATHER = 30 * 60 // 30 minutes

@Module({
  imports: [
    ConfigModule,
    LocationModule,
    CacheModule.register({ ttl: CACHE_TTL_WEATHER }),
  ],
  providers: [WeatherService, WeatherClient],
  controllers: [WeatherController],
})
export class WeatherModule {}
