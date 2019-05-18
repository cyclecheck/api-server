import { GoogleMapsClient, createClient, AddressComponent } from '@google/maps'

import { Place } from './location.service'

export class LocationClient {
  private readonly googleClient: GoogleMapsClient

  constructor(apiKey: string) {
    this.googleClient = createClient({ key: apiKey, Promise: Promise })
  }

  async reverseGeocode(lat: number, lng: number): Promise<Place> {
    const result = await this.googleClient
      .reverseGeocode({ latlng: { lat, lng } })
      .asPromise()

    return parsePlacesResult(result.json.results[0].address_components)
  }
}

function parsePlacesResult(components: AddressComponent[]): Place {
  const componentMap: AddressComponentMap = components
    .map(value => ({ value, type: value.types[0] }))
    .reduce(
      (prev, { value, type }) => ({
        ...prev,
        [type as string]: {
          long: value.long_name,
          short: value.short_name,
        },
      }),
      {},
    )

  const long = (key: string) =>
    componentMap[key] ? componentMap[key].long : ''
  const short = (key: string) =>
    componentMap[key] ? componentMap[key].short : ''

  return {
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
