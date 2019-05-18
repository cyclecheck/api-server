import { Module } from '@nestjs/common'

import { LocationController } from './location.controller'
import { LocationService } from './location.service'
import { ConfigModule } from '../config/config.module'

@Module({
  imports: [ConfigModule],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
