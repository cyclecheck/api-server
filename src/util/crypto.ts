import { createHmac } from 'crypto'
import * as hat from 'hat'

export function hashString(value: string): string {
  return createHmac('sha256', value).digest('hex')
}

export function generateId(): string {
  return hat(256)
}
