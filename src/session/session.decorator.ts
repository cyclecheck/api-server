import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
  UseGuards,
} from '@nestjs/common'

import {
  SESSION_HEADER,
  SessionGuard,
} from './session.guard'

export const IGNORE_SESSION = 'ignore_session'

/**
 * Each request made to the api should contain this 'auth' session token.
 *
 * There are two uses for this token:
 * * Another step at slowing down someone from using the API not from the app 
 * (they can easily check the source code, but whatever)
 * * Using it in the Google Places API, so we don't get over billed
 *
 * @see https://developers.google.com/places/web-service/autocomplete#session_tokens
 */
export const SessionToken = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  return request.headers[SESSION_HEADER]
})

export const IgnoreSession = () => SetMetadata(IGNORE_SESSION, true)

export const SessionRequired = () => UseGuards(SessionGuard)
