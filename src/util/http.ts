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
  code: number
  metadata: any
}

export type APIResponse<T> = Promise<Response<T>>

export function response<T>(
  data: T,
  {
    message = 'OK',
    metadata = null,
    code = 200,
  }: { message?: string; metadata?: any; code?: number } = {},
): Response<T> {
  return { data, message, code, metadata }
}
