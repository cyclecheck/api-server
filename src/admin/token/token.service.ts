import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Token, TokenEntity } from './token.entity'

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
  ) {}

  async validate(token: string): Promise<boolean> {
    const found = await this.find(token)

    return found ? true : false
  }

  async create(): Promise<Token> {
    const token = new TokenEntity()
    await this.tokenRepository.insert(token)

    return token
  }

  async revoke(token: string): Promise<boolean> {
    const found = await this.find(token)
    if (!found) return false

    await this.tokenRepository.delete({ key: token })
    return true
  }

  revokeAll() {
    return this.tokenRepository.clear()
  }

  private find(token: string) {
    return this.tokenRepository.findOne({ where: { key: token } })
  }
}
