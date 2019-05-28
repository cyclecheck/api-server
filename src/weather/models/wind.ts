export interface Wind {
  label: string
  degree: number
  gust: number
  speed: number
}

export class WindModel implements Wind {
  label: string

  constructor(
    readonly degree: number,
    readonly gust: number,
    readonly speed: number,
  ) {
    this.label = degreeToCardinalDirection(degree)
  }
}

const WIND_DIRECTIONS = [
  'N',
  'NNE',
  'NE',
  'ENE',
  'E',
  'ESE',
  'SE',
  'SSE',
  'S',
  'SSW',
  'SW',
  'WSW',
  'W',
  'WNW',
  'NW',
  'NNW',
]

function degreeToCardinalDirection(degree: number): string {
  const index = Math.floor(degree / 22.5 + 0.5) % WIND_DIRECTIONS.length
  return WIND_DIRECTIONS[index]
}
