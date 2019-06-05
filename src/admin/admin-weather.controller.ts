import { Controller, Delete } from '@nestjs/common'

import { Authenticated } from '../auth/auth.decorator'
import { response } from '../util/http'
import { WeatherService } from '../weather/weather.service'
import { PATH_ADMIN } from './admin.controller'

@Controller(`${PATH_ADMIN}/weather`)
@Authenticated()
export class AdminWeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Delete('cache')
  clearLocationCache() {
    this.weatherService.invalidate()
    return response(true)
  }
}
