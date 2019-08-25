export interface Wind {
  label: string
  name: string
  degree: number
  gust: number
  speed: number
}

export class WindModel implements Wind {
  label: string
  name: string

  constructor(
    readonly degree: number,
    readonly gust: number,
    readonly speed: number,
  ) {
    const direction = degreeToCardinalDirection(degree)
    this.label = direction[0]
    this.name = direction[1]
  }
}

const WIND_DIRECTIONS = [
  ['N', 'North'],
  ['NNE', 'North by Northeast'],
  ['NE', 'Northeast'],
  ['ENE', 'East by Northeast'],
  ['E', 'East'],
  ['ESE', 'East by Southeast'],
  ['SE', 'Southeast'],
  ['SSE', 'South by Southeast'],
  ['S', 'South'],
  ['SSW', 'South by Southwest'],
  ['SW', 'Southwest'],
  ['WSW', 'West by Southwest'],
  ['W', 'West'],
  ['WNW', 'West by Northwest'],
  ['NW', 'Northwest'],
  ['NNW', 'North by Northwest'],
]

function degreeToCardinalDirection(degree: number): string[] {
  const index = Math.floor(degree / 22.5 + 0.5) % WIND_DIRECTIONS.length
  return WIND_DIRECTIONS[index]
}
