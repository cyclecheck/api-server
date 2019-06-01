import { mpsToKph } from '../../util/misc'
import { Reason, Reasons, Score, ScoreCriteria } from '../models/score'
import { Weather } from '../models/weather'

export const TEMPERATURE_WOBBLE = 5 // Degrees
export const WIND_SPEED_WOBBLE = 10 // km/h

/**
 * Calculate a cyclescore based on current weather conditions.
 *
 * Value between:
 * no 0.0 <- 0.5 -> 1.0 yes
 *
 * @param weather The weather forecast.
 * @param options Options for determining score.
 */
export function calculateScore(
  weather: Weather,
  options: ScoreCriteria,
): Score {
  const { reasons, warnings } = createReasons(weather, options)

  const score = [...reasons, ...warnings].reduce(
    (total, reasons) => total - reasons.score,
    1,
  )

  return {
    value: score,
    reasons: reasons.map(x => x.text),
    warnings: warnings.map(x => x.text),
  }
}

function createReasons(
  weather: Weather,
  { minTemp, maxTemp, maxWind }: ScoreCriteria,
) {
  const currentTemp = Math.round(weather.current.temperature)
  const windSpeed = mpsToKph(Math.round(weather.current.wind.speed))
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

  console.log(`PRECIPPPPP: ${precipProbability}`)
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

  return {
    reasons: [isTooCold, isTooHot, isTooWindy, hasPrecipitation].filter(
      reason => reason.check,
    ),
    warnings: [isCold, isHot, isWindy, smallChanceOfPrecipitation].filter(
      warning => warning.check,
    ),
  }
}
