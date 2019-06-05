import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ConfigModule } from '../config/config.module'
import { AdminController } from './admin.controller'
import { AdminEntity } from './admin.entity'
import { AdminService } from './admin.service'
import { AuthController } from './auth/auth.controller'
import { AuthService } from './auth/auth.service'
import { TokenEntity } from './token/token.entity'
import { TokenService } from './token/token.service'

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([AdminEntity, TokenEntity])],
  controllers: [AdminController, AuthController],
  providers: [AdminService, TokenService, AuthService],
  exports: [AuthService],
})
export class AdminModule {}
