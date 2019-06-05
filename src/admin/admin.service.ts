import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ConfigService } from '../config/config.service'
import { AdminEntity, AdminUser } from './admin.entity'

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
    private readonly configService: ConfigService,
  ) {}

  async validate(user: AdminUser): Promise<boolean> {
    const admin = await this.getAdmin()

    return admin.compare(user)
  }

  private async getAdmin(): Promise<AdminEntity> {
    const { username, password } = this.configService.config.admin
    const admin = await this.findAdmin()
    if (admin) return admin

    await this.adminRepository.insert(new AdminEntity(username, password))
    return this.findAdmin() as any
  }

  private findAdmin() {
    const { username } = this.configService.config.admin
    return this.adminRepository.findOne({ where: { username } })
  }
}
