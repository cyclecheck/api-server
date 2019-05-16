import { Controller, Get } from '@nestjs/common'

@Controller('location')
export class LocationController {
  @Get()
  fromLatLng(): string {
    return 'London, ON'
  }
}
