import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ConfigService } from '../../config/config.service'
import { AdminUser, AdminUserEntity } from './user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(AdminUserEntity)
    private readonly adminRepository: Repository<AdminUserEntity>,
    private readonly configService: ConfigService,
  ) {}

  async validate(user: AdminUser): Promise<boolean> {
    const admin = await this.getAdmin()

    return admin.compare(user)
  }

  private async getAdmin(): Promise<AdminUserEntity> {
    const { username, password } = this.configService.config.admin
    const admin = await this.findAdmin()
    if (admin) return admin

    await this.adminRepository.insert(new AdminUserEntity(username, password))
    return this.findAdmin() as any
  }

  private async findAdmin() {
    return (await this.adminRepository.find())[0]
  }
}
