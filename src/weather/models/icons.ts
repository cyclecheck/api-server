import { WeatherIcon } from 'darkskyapi-ts'

/**
 * Convert DarkSky icon to a front-end display icon
 *
 * TODO: Add ability to add day/night
 *
 * @see https://github.com/erikflowers/weather-icons
 */
const DISPLAY_ICON_MAP = {
  [WeatherIcon.CLEAR_DAY]: 'wi-day-sunny',
  [WeatherIcon.CLEAR_NIGHT]: 'wi-night-clear',
  [WeatherIcon.RAIN]: 'wi-rain',
  [WeatherIcon.SNOW]: 'wi-snow',
  [WeatherIcon.SLEET]: 'wi-sleet',
  [WeatherIcon.WIND]: 'wi-strong-windy',
  [WeatherIcon.FOG]: 'wi-fog',
  [WeatherIcon.CLOUDY]: 'wi-cloudy',
  [WeatherIcon.PARTLY_CLOUDY_DAY]: 'wi-day-cloudy',
  [WeatherIcon.PARTLY_CLOUDY_NIGHT]: 'wi-night-alt-cloudy',
  [WeatherIcon.HAIL]: 'wi-hail',
  [WeatherIcon.THUNDERSTORM]: 'wi-thunderstorm',
  [WeatherIcon.TORNADO]: 'wi-tornado',
  [WeatherIcon.UNKNOWN]: 'wi-na',
  WIND_DAY: 'wi-day-windy',
  FOG_NIGHT: 'wi-night-fog',
}

const DAY_MODE = 'day'
const NIGHT_MODE = 'night-alt'

const NO_MODIFIER = [
  DISPLAY_ICON_MAP[WeatherIcon.CLEAR_DAY],
  DISPLAY_ICON_MAP[WeatherIcon.CLEAR_NIGHT],
  DISPLAY_ICON_MAP[WeatherIcon.PARTLY_CLOUDY_DAY],
  DISPLAY_ICON_MAP[WeatherIcon.PARTLY_CLOUDY_NIGHT],
  DISPLAY_ICON_MAP[WeatherIcon.TORNADO],
  DISPLAY_ICON_MAP[WeatherIcon.UNKNOWN],
]

export function getDisplayIcon(icon: WeatherIcon, isNight: boolean) {
  if (icon === WeatherIcon.WIND) {
    return isNight
      ? DISPLAY_ICON_MAP[WeatherIcon.WIND]
      : DISPLAY_ICON_MAP.WIND_DAY
  } else if (icon === WeatherIcon.FOG) {
    return isNight
      ? DISPLAY_ICON_MAP.FOG_NIGHT
      : DISPLAY_ICON_MAP[WeatherIcon.FOG]
  }

  const displayIcon =
    DISPLAY_ICON_MAP[icon] || DISPLAY_ICON_MAP[WeatherIcon.UNKNOWN]

  if (NO_MODIFIER.includes(displayIcon)) return displayIcon

  return displayIcon.replace('wi-', `wi-${isNight ? NIGHT_MODE : DAY_MODE}-`)
}
