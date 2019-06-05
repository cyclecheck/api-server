import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { headers } from '../../util/http'
import { IGNORE_AUTH } from './auth.decorator'
import { AuthService } from './auth.service'

export const HEADER_TOKEN = 'token'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ignoreAuth = this.reflector.get<string[]>(
      IGNORE_AUTH,
      context.getHandler(),
    )

    if (ignoreAuth) return true

    const authToken = headers(context, HEADER_TOKEN)
    if (!authToken) {
      throw new BadRequestException(
        `Missing the authentication '${HEADER_TOKEN}' header!`,
      )
    }

    const valid = await this.authService.validateToken(authToken)
    if (valid) return true

    throw new UnauthorizedException('Token was invalid!')
  }
}
