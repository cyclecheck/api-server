import { Controller, Delete } from '@nestjs/common'
import { Authenticated } from './auth/auth.decorator'

@Controller('admin')
@Authenticated()
export class AdminController {
  @Delete('location')
  clearLocationCache() {
    return -1
  }

  @Delete('weather')
  clearWeatherCache() {
    return -1
  }
}
