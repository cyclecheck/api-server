import { Controller, Get } from '@nestjs/common'

import { IgnoreSession } from './session/session.decorator'
import { response } from './util/http'

@Controller()
export class AppController {
  @Get()
  @IgnoreSession()
  heartbeat() {
    return response("You've reached the CycleCheck API")
  }
}
