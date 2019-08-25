import { Alert, DataPoint, Forecast } from 'darkskyapi-ts'

import { unixToDate } from '../../util/misc'
import { getDisplayIcon } from './icons'
import { Preciptation } from './precipitation'
import { Score } from './score'
import { Wind, WindModel } from './wind'

/**
 * The default value for an acceptable minimum temperature, in celcius.
 *
 * Used in calculating cyclescore.
 */
export const DEFAULT_ACCEPTABLE_MIN_TEMP = 5

/**
 * The default value for an acceptable max temperature, in celcius.
 *
 * Used in calculating cyclescore.
 */
export const DEFAULT_ACCEPTABLE_MAX_TEMP = 40

/**
 * The default value for an acceptable amount of wind speed, in km/h.
 *
 * Used in calculating cyclescore.
 */
export const DEFAULT_ACCEPTABLE_MAX_WIND = 30

export interface Weather {
  maxTemp: number
  minTemp: number
  sunrise: number
  sunset: number
  wind: Wind
  maxWind: number
  minWind: number
  precipitation: Preciptation
  current: WeatherBlock
  hourly: WeatherBlock[]
  alerts: Alert[]
}

export interface WeatherWithScore extends Weather {
  current: WeatherBlockWithScore
  hourly: WeatherBlockWithScore[]
}

export interface WeatherBlock {
  forecastedTime: number
  temperature: number
  apparentTemperature: number
  cloudPercent: number
  humidity: number
  uvIndex: number
  wind: Wind
  precipitation: Preciptation
  weatherType: string
}

export interface WeatherBlockWithScore extends WeatherBlock {
  score: Score
}

export function createWeatherModel(forecast: Forecast): Weather {
  if (!forecast.currently || !forecast.hourly || !forecast.daily) {
    throw Error('Forecast response is missing some required params!')
  }

  const today = forecast.daily.data[0]

  const now = new Date()
  const sunrise = unixToDate(today.sunriseTime)
  const sunset = unixToDate(today.sunsetTime)
  const isNight = now <= sunrise && now >= sunset

  const current = createWeatherBlock(forecast.currently, isNight)
  const hourly = forecast.hourly.data
    .slice(0, 24)
    .map(hour => createWeatherBlock(hour, isNight))

  const windSpeeds = [
    current.wind.speed,
    ...hourly.map(hour => hour.wind.speed),
  ]

  return {
    current,
    hourly,
    maxTemp: today.temperatureMax,
    minTemp: today.temperatureMin,
    maxWind: Math.max(...windSpeeds),
    minWind: Math.min(...windSpeeds),
    sunrise: today.sunriseTime,
    sunset: today.sunsetTime,
    wind: createWind(today),
    precipitation: createPrecipitation(today),
    alerts: forecast.alerts || [],
  }
}

function createWeatherBlock(
  datapoint: DataPoint,
  isNight: boolean,
): WeatherBlock {
  return {
    forecastedTime: datapoint.time,
    temperature: datapoint.temperature!,
    apparentTemperature: datapoint.apparentTemperature!,
    cloudPercent: datapoint.cloudCover!,
    humidity: datapoint.humidity!,
    uvIndex: datapoint.uvIndex!,
    wind: createWind(datapoint),
    precipitation: createPrecipitation(datapoint),
    weatherType: getDisplayIcon(datapoint.icon!, isNight),
  }
}

function createWind({ windBearing, windGust, windSpeed }: DataPoint): Wind {
  return new WindModel(windBearing!, windGust!, windSpeed!)
}

function createPrecipitation(datapoint: DataPoint): Preciptation {
  return {
    probability: datapoint.precipProbability!,
    type: datapoint.precipType!,
    intensity: datapoint.precipIntensity!,
  }
}
