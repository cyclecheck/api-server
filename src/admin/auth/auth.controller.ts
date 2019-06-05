import { Body, Controller, Get, Post } from '@nestjs/common'

import { badRequest } from '../../util/errors'
import { response } from '../../util/http'
import { AdminUser } from '../admin.entity'
import { Authenticated } from '../auth/auth.decorator'
import { AuthToken, IgnoreAuth } from './auth.decorator'
import { AuthService } from './auth.service'

@Controller('auth')
@Authenticated()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @IgnoreAuth()
  async login(@Body() body: AdminUser) {
    const result = await this.authService.login(body)
    if (!result) throw badRequest('Invalid credentials')

    return response({ token: result.key })
  }

  @Get('logout')
  async logout(@AuthToken() token: string) {
    const result = await this.authService.revoke(token)
    return response({ success: result })
  }
}
