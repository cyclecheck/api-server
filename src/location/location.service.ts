import { Injectable } from '@nestjs/common'

import { ConfigService } from '../config/config.service'
import { LocationClient } from './location.client'

@Injectable()
export class LocationService {
  private readonly locationClient: LocationClient

  constructor({ config: { googleMapsApi } }: ConfigService) {
    this.locationClient = new LocationClient(googleMapsApi)
  }

  async decodeLatLng(lat: number, lng: number): Promise<Place> {
    return this.locationClient.reverseGeocode(lat, lng)
  }
}

export interface Place {
  city: string
  adminArea: string
  adminAreaShort: string
  country: string
  countryShort: string
  postalCode: string
}
