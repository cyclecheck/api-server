import { HttpException, HttpStatus } from '@nestjs/common'

export function badRequest(message: string) {
  return new HttpException(message, HttpStatus.BAD_GATEWAY)
}

export function notFound(message: string) {
  return new HttpException(message, HttpStatus.NOT_FOUND)
}
