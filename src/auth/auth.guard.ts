import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { IGNORE_AUTH } from './auth.decorator'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const ignoreGuard = this.reflector.get<string[]>(
      IGNORE_AUTH,
      context.getHandler(),
    )

    if (ignoreGuard) return true

    const authHeader = context.switchToHttp().getRequest().headers[AUTH_HEADER]
    if (!authHeader) {
      throw new UnauthorizedException(`Missing '${AUTH_HEADER}' header!`)
    }
    return true
  }
}

export const AUTH_HEADER = 'auth'
