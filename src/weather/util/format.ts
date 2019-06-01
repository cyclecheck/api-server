import { Units } from 'darkskyapi-ts'

import { mpsToKph } from '../../util/misc'
import { Weather, WeatherBlock } from '../models/weather'
import { WEATHER_UNITS_IMPERIAL, WEATHER_UNITS_METRIC } from '../weather.client'

export function isAcceptableUnit(units: Units) {
  return units === WEATHER_UNITS_IMPERIAL || units === WEATHER_UNITS_METRIC
}

export function formatWeatherUnits(weather: Weather, units: Units): Weather {
  if (!isAcceptableUnit(units)) {
    units = WEATHER_UNITS_METRIC
  }

  const { maxTemp, minTemp, current, hourly } = weather
  return {
    ...weather,
    maxTemp: formatTemperature(maxTemp, units),
    minTemp: formatTemperature(minTemp, units),
    current: formatWeatherBlock(current, units),
    hourly: hourly.map(hour => formatWeatherBlock(hour, units)),
  }
}

function formatWeatherBlock(block: WeatherBlock, units: Units): WeatherBlock {
  const { temperature, apparentTemperature, wind } = block
  return {
    ...block,
    temperature: formatTemperature(temperature, units),
    apparentTemperature: formatTemperature(apparentTemperature, units),
    wind: {
      ...wind,
      speed: formatWindSpeed(wind.speed, units),
      gust: formatWindSpeed(wind.gust, units),
    },
  }
}

/**
 * Will take a temperature value in SI units (celcius) and convert it
 * to farenheit if the units are imperial.
 *
 * @param temp Temperature value in celcius.
 * @param units Desired units.
 * @returns Temperature in celcius or converted to farenheit.
 */
function formatTemperature(temp: number, units: Units): number {
  if (units !== Units.US) return temp

  // Convert celcius to farenheit
  return (temp * 9) / 5 + 32
}

/**
 * Will take a wind speed value in SI units (meters per second),
 * and convert it based on the required units.
 *
 * Metric: kilometers per hour.
 * Imperial: miles per hour.
 *
 * @param speed Wind speed to convert in meters per second.
 * @param units Required units.
 * @returns Converted windspeed.
 */
function formatWindSpeed(speed: number, units: Units): number {
  if (units === WEATHER_UNITS_METRIC) return mpsToKph(speed)
  else return speed * 2.237
}
