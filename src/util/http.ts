import { HttpException, HttpStatus } from '@nestjs/common'

export function badRequest(message: string) {
  return new HttpException(message, HttpStatus.BAD_GATEWAY)
}

export function notFound(message: string) {
  return new HttpException(message, HttpStatus.NOT_FOUND)
}

export interface Response<T> {
  data: T
  message: string
  metadata: any
}

export type APIResponse<T> = Promise<Response<T>>

export function response<T>(
  data: T,
  message: string = 'OK',
  metadata: any = null,
): Response<T> {
  return { data, message, metadata }
}
