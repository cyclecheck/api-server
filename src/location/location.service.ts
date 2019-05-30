import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ConfigService } from '../config/config.service'
import { days, MemoryCache } from '../util/cache'
import { LocationClient } from './location.client'
import { Place, PlaceEntity } from './place.entity'

@Injectable()
export class LocationService {
  private readonly cache = new MemoryCache({ ttl: days(30), max: 1000 })
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
    const cached = await this.cache.getOrSet(id, () =>
      this.placeRepository.findOne(id),
    )

    if (cached) {
      this.logger.debug(`Retrieving ${id} from cache.`)
      // TODO: If Place record is very old 6 months? refresh the id
      return cached
    }

    const result = await this.locationClient.getPlaceDetails(id, token)
    if (result) {
      await this.placeRepository.insert(result)
      await this.cache.set(id, result)
    }

    return result
  }

  async idToLatLng(id: string, token: string): Promise<LatLng | null> {
    const result = await this.placeDetails(id, token)
    if (result) {
      return { lat: result.lat, lng: result.lng }
    }

    return null
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
