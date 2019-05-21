import { createParamDecorator, SetMetadata } from '@nestjs/common'

import { AUTH_HEADER } from './auth.guard'

export const IGNORE_AUTH = 'ignore_auth'

export const AuthToken = createParamDecorator(
  (_, req) => req.headers[AUTH_HEADER],
)

export const IgnoreAuth = () => SetMetadata(IGNORE_AUTH, true)
