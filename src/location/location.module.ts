import { CacheModule, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ConfigModule } from '../config/config.module'
import { LocationController } from './location.controller'
import { LocationService } from './location.service'
import { PlaceEntity } from './place.entity'

const CACHE_TTL_LOCATION = 24 * 3600 // 24 hours

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([PlaceEntity]),
    CacheModule.register({ ttl: CACHE_TTL_LOCATION }),
  ],
  controllers: [LocationController],
  providers: [LocationService],
  exports: [LocationService],
})
export class LocationModule {}
