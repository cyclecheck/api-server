import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common'

import {
  LocationService,
  Place,
  AutocompletePlace,
  LatLng,
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
    @Query('token') token: string,
  ): Promise<LatLng> {
    if (!token) invalidToken()

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
  async search(@Query() { input, token }: SearchQuery): Promise<
    AutocompletePlace[]
  > {
    if (!input) return []
    else if (!token) invalidToken()

    return this.locationService.searchPlaces(input, token)
  }
}

const invalidToken = () => {
  throw new HttpException(
    'A unique session `token` is required',
    HttpStatus.BAD_REQUEST,
  )
}

interface SearchQuery {
  input: string
  token: string
}
