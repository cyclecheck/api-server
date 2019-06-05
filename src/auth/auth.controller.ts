import { Body, Controller, Delete, Post } from '@nestjs/common'

import { badRequest } from '../util/errors'
import { response } from '../util/http'
import { Authenticated, AuthToken, IgnoreAuth } from './auth.decorator'
import { AuthService } from './auth.service'
import { AdminUser } from './user/user.entity'

@Controller('auth')
@Authenticated()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @IgnoreAuth()
  async login(@Body() body: AdminUser) {
    if (!body || !body.username || !body.password) {
      throw badRequest('Invalid user payload')
    }

    const result = await this.authService.login(body)
    if (!result) throw badRequest('Invalid credentials')

    return response({ token: result.key })
  }

  @Delete()
  async logout(@AuthToken() token: string) {
    const result = await this.authService.revoke(token)
    return response({ success: result })
  }
}
