import { Controller, Get, Param, Query } from '@nestjs/common'
import { Units } from 'darkskyapi-ts'

import { LocationService } from '../location/location.service'
import { SessionToken } from '../session/session.decorator'
import { notFound, serviceUnavailable } from '../util/errors'
import { APIResponse, badRequest, response } from '../util/http'
import { ScoreCriteria, Scores } from './models/score'
import {
  DEFAULT_ACCEPTABLE_MAX_TEMP,
  DEFAULT_ACCEPTABLE_MAX_WIND,
  DEFAULT_ACCEPTABLE_MIN_TEMP,
  Weather,
} from './models/weather'
import { formatWeatherUnits, isAcceptableUnit } from './util/format'
import { calculateAllScores } from './util/score'
import { WEATHER_UNITS_METRIC } from './weather.client'
import { WeatherService } from './weather.service'

@Controller('weather')
export class WeatherController {
  constructor(
    private readonly locationService: LocationService,
    private readonly weatherService: WeatherService,
  ) {}

  @Get(':id')
  async checkWeather(
    @Param('id') id: string,
    @SessionToken() token: string,
    @Query()
    {
      maxTemp = DEFAULT_ACCEPTABLE_MAX_TEMP,
      minTemp = DEFAULT_ACCEPTABLE_MIN_TEMP,
      maxWind = DEFAULT_ACCEPTABLE_MAX_WIND,
      units = WEATHER_UNITS_METRIC,
      raw,
    }: CheckQueryParams,
  ): APIResponse<CheckResponseData> {
    if (!isAcceptableUnit(units)) {
      throw badRequest(
        `Unit [${units}] is not valid, must be Metric [si] or Imperial [us]`,
      )
    }

    const location = await this.locationService.placeDetails(id, token)
    if (!location) throw notFound(`Could not find place: ${id}`)

    const { lat, lng } = location
    const weather = await this.weatherService.getWeatherForecast(id, lat, lng)
    if (!weather) {
      throw serviceUnavailable(
        `Unable to get required forecast information for ${id}`,
      )
    }

    return response<CheckResponseData>({
      weather: raw ? weather : formatWeatherUnits(weather, units),
      score: calculateAllScores(weather, { maxTemp, minTemp, maxWind }),
      criteria: { units, maxTemp, minTemp, maxWind },
    })
  }
}

interface CheckResponseData {
  score: Scores
  weather: Weather
  criteria: CheckQueryParams
}

interface CheckQueryParams extends ScoreCriteria {
  units?: Units
  raw?: boolean
}
