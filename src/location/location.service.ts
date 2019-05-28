import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ConfigService } from '../config/config.service'
import { LocationClient } from './location.client'
import { Place, PlaceEntity } from './place.entity'

@Injectable()
export class LocationService {
  private readonly logger = new Logger('LocationService')
  private readonly locationClient: LocationClient

  constructor(
    @InjectRepository(PlaceEntity)
    private readonly placeRepository: Repository<PlaceEntity>,
    { config: { googleMapsApi } }: ConfigService,
  ) {
    this.locationClient = new LocationClient(googleMapsApi)
  }

  async decodeLatLng(lat: number, lng: number): Promise<Place> {
    const result = await this.locationClient.reverseGeocode(lat, lng)
    await this.placeRepository.insert(result)

    return result
  }

  searchPlaces(input: string, token: string): Promise<AutocompletePlace[]> {
    return this.locationClient.autocompletePlaces(input, token)
  }

  async placeDetails(id: string, token: string): Promise<Place | null> {
    const cached = await this.placeRepository.findOne(id)
    if (cached) {
      this.logger.debug(`Retrieving ${id} from cache.`)
      // TODO: If Place record is very old 6 months? refresh the id
      return cached
    }

    const result = await this.locationClient.getPlaceDetails(id, token)
    if (result) {
      await this.placeRepository.insert(result)
    }

    return result
  }

  async idToLatLng(id: string, token: string): Promise<LatLng | null> {
    const cached = await this.placeRepository.findOne(id)
    if (cached) {
      this.logger.debug(`Retrieving ${id} from cache.`)
      return { lat: cached.lat, lng: cached.lng }
    }

    const result = await this.locationClient.getPlaceDetails(id, token)
    if (!result) return null

    await this.placeRepository.insert(result)
    return { lat: result.lat, lng: result.lng }
  }
}

export interface LatLng {
  lat: number
  lng: number
}

export interface AutocompletePlace {
  name: string
  id: string
}
