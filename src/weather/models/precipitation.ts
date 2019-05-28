import { PrecipitationType } from 'darkskyapi-ts'

export interface Preciptation {
  probability: number
  type: PrecipitationType
  intensity: number
}
