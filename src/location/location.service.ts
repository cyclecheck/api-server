import { Injectable } from '@nestjs/common'

import { ConfigService } from '../config/config.service'
import { LocationClient } from './location.client'

@Injectable()
export class LocationService {
  private readonly locationClient: LocationClient

  constructor({ config: { googleMapsApi } }: ConfigService) {
    this.locationClient = new LocationClient(googleMapsApi)
  }

  decodeLatLng(lat: number, lng: number): Promise<Place> {
    return this.locationClient.reverseGeocode(lat, lng)
  }

  placeDetails(id: string, token: string): Promise<Place | null> {
    return this.locationClient.getPlaceDetails(id, token)
  }

  idToLatLng(id: string, token: string): Promise<LatLng | null> {
    return this.locationClient.latLngFromPlaceId(id, token)
  }

  searchPlaces(input: string, token: string): Promise<AutocompletePlace[]> {
    return this.locationClient.autocompletePlaces(input, token)
  }
}

export interface Place {
  id: string
  city: string
  adminArea: string
  adminAreaShort: string
  country: string
  countryShort: string
  postalCode: string
}

export interface LatLng {
  lat: number
  lng: number
}

export interface AutocompletePlace {
  name: string
  id: string
}
