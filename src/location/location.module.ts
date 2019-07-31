import { CacheModule, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from '../auth/auth.module'
import { ConfigModule } from '../config/config.module'
import { days } from '../util/cache'
import { LocationController } from './location.controller'
import { LocationService } from './location.service'
import { PlaceEntity } from './place.entity'

@Module({
  imports: [
    ConfigModule,
    CacheModule.register({ ttl: days(365) }),
    TypeOrmModule.forFeature([PlaceEntity]),
    AuthModule,
  ],
  controllers: [LocationController],
  providers: [LocationService],
  exports: [LocationService],
})
export class LocationModule {}
