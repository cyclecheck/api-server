import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common'

import { AuthToken } from '../auth/auth.decorator'
import {
  AutocompletePlace,
  LatLng,
  LocationService,
  Place,
} from './location.service'

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('latlng')
  async fromLatLng(@Query() { lat, lng }: LatLng): Promise<Place> {
    if (!lat || !lng) {
      throw new HttpException(
        'Both lat and lng are required',
        HttpStatus.BAD_REQUEST,
      )
    }

    return this.locationService.decodeLatLng(lat, lng)
  }

  @Get(':id')
  async idToLatLng(
    @Param('id') id: string,
    @AuthToken() token: string,
  ): Promise<LatLng> {
    const found = await this.locationService.idToLatLng(id, token)
    if (!found) {
      throw new HttpException(
        `Unable to find Place matching ${id}`,
        HttpStatus.NOT_FOUND,
      )
    }

    return found
  }

  @Get('search')
  async search(
    @Query() { input }: SearchQuery,
    @AuthToken() token: string,
  ): Promise<AutocompletePlace[]> {
    if (!input) return []

    return this.locationService.searchPlaces(input, token)
  }
}

interface SearchQuery {
  input: string
  token: string
}
