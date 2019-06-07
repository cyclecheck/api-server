import { HttpModule, Module } from '@nestjs/common'

import { ConfigModule } from '../config/config.module'
import { VersionController } from './version.controller'
import { VersionService } from './version.service'

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [VersionService],
  controllers: [VersionController],
  exports: [VersionService],
})
export class VersionModule {}
