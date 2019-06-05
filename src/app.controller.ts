import { Controller, Get } from '@nestjs/common'

import { IgnoreSession } from './session/session.decorator'
import { response } from './util/http'

@Controller()
export class AppController {
  @Get('/health')
  @IgnoreSession()
  heartbeat() {
    return response('I\'m alive!')
  }
}
