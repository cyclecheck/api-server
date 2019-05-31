import { Units } from 'darkskyapi-ts'

import { Weather } from '../models/weather'
import { WEATHER_UNIT } from '../weather.client'

export function formatWeatherUnits(weather: Weather, units: Units) {

}

/**
 * Need to convert the temperature number from [[WEATHER_UNIT]] to
 * the desired unit.
 *
 * @param temp
 * @param units
 */
function formatTemperature(temp: number, units: Units) {
  switch(units) {
    case WEATHER_UNIT: return temp
    case Units.
  }
}