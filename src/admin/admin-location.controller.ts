import { Controller, Delete, Get, Param } from '@nestjs/common'

import { Authenticated } from '../auth/auth.decorator'
import { LocationService } from '../location/location.service'
import { notFound, response } from '../util/http'
import { PATH_ADMIN } from './admin.controller'

@Controller(`${PATH_ADMIN}/location`)
@Authenticated()
export class AdminLocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  async list() {
    return response(await this.locationService.listPlaces())
  }

  @Delete('database')
  async clearLocationDatabase() {
    await this.locationService.clearDatabase()
    return response(true)
  }

  @Delete('cache')
  clearLocationCache() {
    this.locationService.invalidate()
    return response(true)
  }

  @Delete(':id')
  async deletePlace(@Param('id') id: string) {
    const deleted = await this.locationService.remove(id)
    if (!deleted) throw notFound(`Unable to find Place with id ${id}`)

    return response(true)
  }
}
