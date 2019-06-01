import { HttpException, HttpStatus } from '@nestjs/common'

export function badRequest(message: string) {
  return new HttpException(message, HttpStatus.BAD_REQUEST)
}

export function notFound(message: string) {
  return new HttpException(message, HttpStatus.NOT_FOUND)
}

export function serviceUnavailable(message: string) {
  return new HttpException(message, HttpStatus.SERVICE_UNAVAILABLE)
}
