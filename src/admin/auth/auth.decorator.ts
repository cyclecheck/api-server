import { createParamDecorator, SetMetadata, UseGuards } from '@nestjs/common'

import { AuthGuard, HEADER_TOKEN } from './auth.guard'

export const IGNORE_AUTH = 'ignore_auth'

export const IgnoreAuth = () => SetMetadata(IGNORE_AUTH, true)

export const Authenticated = () => UseGuards(AuthGuard)

export const AuthToken = createParamDecorator(
  (_, req) => req.headers[HEADER_TOKEN],
)
