import { mpsToKph } from '../../util/misc'
import { Reason, Reasons, Score, ScoreCriteria } from '../models/score'
import {
  Weather,
  WeatherBlock,
  WeatherBlockWithScore,
  WeatherWithScore,
} from '../models/weather'

export const TEMPERATURE_WOBBLE = 5 // Degrees
export const WIND_SPEED_WOBBLE = 10 // km/h

export function calculateAllScores(
  weather: Weather,
  options: ScoreCriteria,
): WeatherWithScore {
  return {
    ...weather,
    current: calculateScore(weather.current, options),
    hourly: weather.hourly.map(hour => calculateScore(hour, options)),
  }
}

/**
 * Calculate a cyclescore based on current weather conditions.
 *
 * Value between:
 * no 0.0 <- 0.5 -> 1.0 yes
 *
 * @param weather The weather forecast.
 * @param options Options for determining score.
 */
function calculateScore(
  weather: WeatherBlock,
  options: ScoreCriteria,
): WeatherBlockWithScore {
  const { reasons, warnings } = createReasons(weather, options)

  const calculatedScore = [...reasons, ...warnings].reduce(
    (total, reasons) => total - reasons.score,
    1,
  )

  const score: Score = {
    value: calculatedScore === 1 ? calculatedScore : calculatedScore % 1.0,
    reasons: reasons.map(x => x.text),
    warnings: warnings.map(x => x.text),
  }

  return { ...weather, score }
}

function createReasons(
  weather: WeatherBlock,
  { minTemp, maxTemp, maxWind }: ScoreCriteria,
) {
  const currentTemp = Math.round(weather.temperature)
  const windSpeed = mpsToKph(Math.round(weather.wind.speed))
  const precipProbability = weather.precipitation.probability

  const isTooCold: Reason = {
    check: currentTemp <= minTemp,
    score: 1,
    text: Reasons.TOO_COLD,
  }

  const isCold: Reason = {
    check: currentTemp - TEMPERATURE_WOBBLE <= minTemp,
    score: 0.25,
    text: Reasons.COLD,
  }

  const isTooHot: Reason = {
    check: currentTemp >= maxTemp,
    score: 0.75,
    text: Reasons.TOO_HOT,
  }

  const isHot: Reason = {
    check: currentTemp + TEMPERATURE_WOBBLE >= maxTemp,
    score: 0.1,
    text: Reasons.HOT,
  }

  const isTooWindy: Reason = {
    check: windSpeed >= maxWind,
    score: 0.75,
    text: Reasons.TOO_WINDY,
  }

  const isWindy: Reason = {
    check: windSpeed + WIND_SPEED_WOBBLE >= maxWind,
    score: 0.3,
    text: Reasons.WINDY,
  }

  const hasPrecipitation: Reason = {
    check: precipProbability >= 0.3,
    score: precipProbability * 1.3,
    text: Reasons.PRECIPITATION,
  }

  const smallChanceOfPrecipitation: Reason = {
    check: !!precipProbability && precipProbability < 0.3,
    score: 0.15,
    text: Reasons.PRECIPITATION,
  }

  const uvIndex: Reason = {
    check: weather.uvIndex >= 7,
    score: 0,
    text: Reasons.UV_INDEX,
  }

  return {
    reasons: [isTooCold, isTooHot, isTooWindy, hasPrecipitation].filter(
      reason => reason.check,
    ),
    warnings: [
      isCold,
      isHot,
      isWindy,
      smallChanceOfPrecipitation,
      uvIndex,
    ].filter(warning => warning.check),
  }
}
