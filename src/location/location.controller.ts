import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common'

import { LocationService, Place } from './location.service'

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('latlng')
  async fromLatLng(@Query() { lat, lng }: FromLatLngQuery): Promise<Place> {
    if (!lat || !lng) {
      throw new HttpException(
        'Both lat and lng are required',
        HttpStatus.BAD_REQUEST,
      )
    }

    return this.locationService.decodeLatLng(lat, lng)
  }
}

interface FromLatLngQuery {
  lat: number
  lng: number
}
