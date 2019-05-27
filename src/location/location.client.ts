import { AddressComponent, createClient, GoogleMapsClient } from '@google/maps'

import { AutocompletePlace, LatLng, Place } from './location.service'

export class LocationClient {
  private readonly googleClient: GoogleMapsClient

  constructor(apiKey: string) {
    this.googleClient = createClient({ key: apiKey, Promise: Promise })
  }

  async reverseGeocode(lat: number, lng: number): Promise<Place> {
    const result = await this.googleClient
      .reverseGeocode({ latlng: { lat, lng } })
      .asPromise()

    return parsePlacesResult(result.json.results[0])
  }

  async getPlaceDetails(
    placeid: string,
    sessiontoken: string,
  ): Promise<Place | null> {
    const result = await this.makePlaceRequest(placeid, sessiontoken)
    if (!result) return null

    return parsePlacesResult(result)
  }

  async latLngFromPlaceId(
    placeid: string,
    sessiontoken: string,
  ): Promise<LatLng | null> {
    const result = await this.makePlaceRequest(placeid, sessiontoken)
    if (!result) return null

    const { lat, lng } = result.geometry.location
    return { lat, lng }
  }

  async autocompletePlaces(
    input: string,
    sessiontoken: string,
  ): Promise<AutocompletePlace[]> {
    const result = await this.googleClient
      .placesAutoComplete({
        input,
        sessiontoken,
        types: '(cities)',
      })
      .asPromise()

    return result.json.predictions.map(prediction => ({
      id: prediction.place_id,
      name: prediction.description,
    }))
  }

  private async makePlaceRequest(placeid: string, sessiontoken: string) {
    try {
      const result = await this.googleClient
        .place({ placeid, sessiontoken })
        .asPromise()

      if (result.json.status !== 'OK') return null

      return result.json.result
    } catch (error) {
      return null
    }
  }
}

interface Result {
  address_components: AddressComponent[]
  place_id: string
}

function parsePlacesResult(result: Result): Place {
  const componentMap: AddressComponentMap = result.address_components.reduce(
    (prev, value) => ({
      ...prev,
      [value.types[0] as string]: {
        long: value.long_name,
        short: value.short_name,
      },
    }),
    {},
  )

  const long = (key: string) =>
    componentMap[key] ? componentMap[key].long || '' : ''
  const short = (key: string) =>
    componentMap[key] ? componentMap[key].short || '' : ''

  return {
    id: result.place_id,
    city: long('locality'),
    adminArea: long('administrative_area_level_1'),
    adminAreaShort: short('administrative_area_level_1'),
    country: long('country'),
    countryShort: short('country'),
    postalCode: long('postal_code'),
  }
}

type AddressComponentMap = {
  [type: string]: { long: string; short: string }
}
