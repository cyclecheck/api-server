import { createParamDecorator, SetMetadata } from '@nestjs/common'

import { SESSION_HEADER as SESSION_TOKEN_HEADER } from './session.guard'

export const IGNORE_SESSION = 'ignore_auth'

/**
 * Each request made to the api should contain this 'auth' session token.
 *
 * There are two uses for this token:
 * * Another step at slowing down someone from using the API not from the app
 * (they can easily check the source code, but whatever)
 * * Using it in the Google Places API, so we don't get over billed
 *
 * @see https://developers.google.com/places/web-service/autocomplete#session_tokens
 *
 */
export const SessionToken = createParamDecorator(
  (_, req) => req.headers[SESSION_TOKEN_HEADER],
)

export const IgnoreAuth = () => SetMetadata(IGNORE_SESSION, true)
