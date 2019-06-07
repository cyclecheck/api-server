import { Controller, Get } from '@nestjs/common'

import { response } from '../util/http'
import { VersionService } from './version.service'

@Controller('version')
export class VersionController {
  constructor(private readonly versionService: VersionService) {}

  @Get()
  currentVersion() {
    return response(this.versionService.currentVersion)
  }

  @Get('latest')
  getLatestVersion() {
    return response(this.versionService.getLatestVersion())
  }
}
