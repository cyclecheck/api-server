import { Units } from 'darkskyapi-ts'

export function prettyPrint(object: Object) {
  return JSON.stringify(object, null, 2)
}

const ALL_UNITS = [Units.AUTO, Units.CA, Units.SI, Units.UK, Units.US]

export function isValidUnit(unit: string | Units): boolean {
  return ALL_UNITS.includes(unit as any)
}

export function mpsToKph(mps: number) {
  return mps * 3.6
}

export function unixToDate(timestamp: number): Date {
  return new Date(timestamp * 1000)
}
