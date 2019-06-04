import { Controller, Get } from '@nestjs/common'

import { IgnoreAuth } from './session/session.decorator'
import { response } from './util/http'

@Controller()
export class AppController {
  @Get('/health')
  @IgnoreAuth()
  heartbeat() {
    return response("I'm alive!")
  }
}
