import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { IGNORE_SESSION } from './session.decorator'

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const ignoreGuard = this.reflector.get<string[]>(
      IGNORE_SESSION,
      context.getHandler(),
    )

    if (ignoreGuard) return true

    const authHeader = context.switchToHttp().getRequest().headers[
      SESSION_HEADER
    ]
    if (!authHeader) {
      throw new UnauthorizedException(`Missing '${SESSION_HEADER}' header!`)
    }
    return true
  }
}

export const SESSION_HEADER = 'session'
