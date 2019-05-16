import { Module } from '@nestjs/common'
import { LocationController } from './location.controller'

@Module({
  imports: [],
  controllers: [LocationController],
})
export class LocationModule {}
