import { Controller, Delete, Get, Param } from '@nestjs/common'

import { Authenticated } from '../auth/auth.decorator'
import { TokenService } from '../auth/token/token.service'
import { notFound, response } from '../util/http'

export const PATH_ADMIN = 'admin'

@Controller(PATH_ADMIN)
@Authenticated()
export class AdminController {
  constructor(private readonly tokenService: TokenService) {}

  @Get('token')
  async allTokens() {
    const tokens = await this.tokenService.list()
    return response(tokens.map(x => x.key))
  }

  @Delete('token/:key')
  async revokeToken(@Param('key') key: string) {
    const result = await this.tokenService.revoke(key)
    if (!result) throw notFound('Unable to find matching token')

    return response(true)
  }

  @Delete('token')
  async revokeAllTokens() {
    await this.tokenService.revokeAll()
    return response(true)
  }
}
