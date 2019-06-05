import { Injectable } from '@nestjs/common'

import { AdminUser } from '../admin.entity'
import { AdminService } from '../admin.service'
import { Token } from '../token/token.entity'
import { TokenService } from '../token/token.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly tokenService: TokenService,
  ) {}

  validateToken(token: string): Promise<boolean> {
    return this.tokenService.validate(token)
  }

  async login(user: AdminUser): Promise<Token | undefined> {
    const valid = await this.adminService.validate(user)
    if (!valid) return

    return this.tokenService.create()
  }

  revoke(token: string) {
    return this.tokenService.revoke(token)
  }

  revokeAll() {
    return this.tokenService.revokeAll()
  }
}
