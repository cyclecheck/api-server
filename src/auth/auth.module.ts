import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ConfigModule } from '../config/config.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { TokenEntity } from './token/token.entity'
import { TokenService } from './token/token.service'
import { AdminUserEntity } from './user/user.entity'
import { UserService } from './user/user.service'

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([AdminUserEntity, TokenEntity]),
  ],
  controllers: [AuthController],
  providers: [UserService, TokenService, AuthService],
  exports: [AuthService, TokenService],
})
export class AuthModule {}
