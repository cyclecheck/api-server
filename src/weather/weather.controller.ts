import { Controller, Get, Param } from '@nestjs/common'

import { IgnoreAuth } from '../session/session.decorator'
import { APIResponse, response } from '../util/http'

@Controller('weather')
@IgnoreAuth()
export class WeatherController {
  @Get(':id')
  async forecast(@Param('id') id: string): APIResponse<any> {
    return response(`ok -> ${id}`)
  }

  @Get('latlng/:lat/:lng')
  async latlngForecast(@Param('lat') lat: number, @Param('lng') lng: number) {
    return response(`ok -> ${lat},${lng}`)
  }
}
