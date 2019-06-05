import { Module } from '@nestjs/common'

import { AuthModule } from '../auth/auth.module'
import { ConfigModule } from '../config/config.module'
import { LocationModule } from '../location/location.module'
import { WeatherModule } from '../weather/weather.module'
import { AdminLocationController } from './admin-location.controller'
import { AdminWeatherController } from './admin-weather.controller'
import { AdminController } from './admin.controller'

@Module({
  imports: [ConfigModule, AuthModule, LocationModule, WeatherModule],
  controllers: [
    AdminController,
    AdminLocationController,
    AdminWeatherController,
  ],
})
export class AdminModule {}
