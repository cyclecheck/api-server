import { Module } from '@nestjs/common'

import { ConfigModule } from '../config/config.module'
import { LocationController } from './location.controller'
import { LocationService } from './location.service'

@Module({
  imports: [ConfigModule],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
