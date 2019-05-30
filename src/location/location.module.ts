import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ConfigModule } from '../config/config.module'
import { LocationController } from './location.controller'
import { LocationService } from './location.service'
import { PlaceEntity } from './place.entity'

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([PlaceEntity])],
  controllers: [LocationController],
  providers: [LocationService],
  exports: [LocationService],
})
export class LocationModule {}
