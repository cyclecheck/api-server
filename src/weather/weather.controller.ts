import {
  CacheInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common'

import { LocationService } from '../location/location.service'
import { SessionToken } from '../session/session.decorator'
import { notFound, serviceUnavailable } from '../util/errors'
import { APIResponse, response } from '../util/http'
import { WeatherService } from './weather.service'

@Controller('weather')
export class WeatherController {
  constructor(
    private readonly locationService: LocationService,
    private readonly weatherService: WeatherService,
  ) {}

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  async checkWeather(
    @Param('id') id: string,
    @SessionToken() token: string,
  ): APIResponse<any> {
    const location = await this.locationService.placeDetails(id, token)
    if (!location) throw notFound(`Could not find place: ${id}`)

    const { lat, lng } = location
    const weather = await this.weatherService.getWeatherForecast(lat, lng)
    if (!weather) {
      throw serviceUnavailable(
        `Unable to get required forecast information for ${id}`,
      )
    }

    // TODO: Calculate the score

    return response({ score: -1, weather })
  }

  @Get('latlng/:lat/:lng')
  async latlngForecast(@Param('lat') lat: number, @Param('lng') lng: number) {
    throw Error('Not yet supported')
  }
}

// interface CheckResponseData {
//   score: number
//   weather: Weather
// }

// interface CheckQueryParams {
//   units?: Units
// }
