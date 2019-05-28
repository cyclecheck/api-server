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
}

export function getDisplayIcon(icon: WeatherIcon) {
  return DISPLAY_ICON_MAP[icon] || DISPLAY_ICON_MAP[WeatherIcon.UNKNOWN]
}
